import { Component, OnInit, OnDestroy, inject, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../core/services/chat';
import { AuthService } from '../../core/services/auth';
import { Subject, BehaviorSubject, takeUntil } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface DisplayMessage extends ChatMessage {
  safeHtml?: SafeHtml;
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat implements OnInit, OnDestroy {
  @Input() roomId!: string; 
  
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private sanitizer = inject(DomSanitizer);
  private destroy$ = new Subject<void>();

  isLoadingMore = false;
  newMessage = '';
  username = this.authService.getCurrentUser()?.username || 'Unknown';
  userId = this.authService.getCurrentUser()?.userId;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private messagesSubject = new BehaviorSubject<DisplayMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  ngOnInit() {
    if (this.roomId) {
      this.chatService.joinRoom(this.roomId, this.username);
    }

    this.chatService.messages$.pipe(takeUntil(this.destroy$)).subscribe(curr => {
      const displayMsg: DisplayMessage = { ...curr };
      if (curr.isRoll) {
        displayMsg.safeHtml = this.sanitizer.bypassSecurityTrustHtml(curr.message);
      }
      this.messagesSubject.next([...this.messagesSubject.value, displayMsg]);
    });

    this.chatService.moreMessages$.pipe(takeUntil(this.destroy$)).subscribe(olderMsgs => {
      const sanitizedOlder: DisplayMessage[] = olderMsgs.map(msg => {
        const display: DisplayMessage = { ...msg };
        if (msg.isRoll) {
          display.safeHtml = this.sanitizer.bypassSecurityTrustHtml(msg.message);
        }
        return display;
      });

      this.messagesSubject.next([...sanitizedOlder, ...this.messagesSubject.value]);
      this.isLoadingMore = false;
    });
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const currentMsgs = this.messagesSubject.value;
    
    if (element.scrollTop === 0 && !this.isLoadingMore && currentMsgs.length > 0) {
      const oldestMessageId = currentMsgs.find(m => m.id !== undefined)?.id;
      
      if (oldestMessageId) {
        this.isLoadingMore = true;
        this.chatService.loadMoreMessages(this.roomId, oldestMessageId);
      }
    }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    let isRoll = false;
    let isComparison = false;
    let isSuccess = false;
    let messageText = this.newMessage;
    if (this.newMessage.startsWith('/roll') || this.newMessage.startsWith('/r ')) {
      isRoll = true;
      const expression = this.newMessage.replace('/roll', '').replace('/r', '').trim();
      
      const result = this.parseAndRoll(expression);
      messageText = result.text;
      isComparison = result.isComparison;
      isSuccess = result.isSuccess;
    }

    this.chatService.sendMessage(this.roomId, messageText, this.username, isRoll, isComparison, isSuccess, this.userId);
    this.newMessage = '';
  }

  private parseAndRoll(expression: string) {
    const tokenRegex = /(\d*d\d+(?:[hl]\d+)?|[+\-*/><]|\d+)/gi;
    const tokens = expression.match(tokenRegex);
    
    if (!tokens) return { text: `Invalid roll format.`, isComparison: false, isSuccess: false };
    let mathExpression = '';
    let detailsHtml = '';
    let hasComparison = false;
    let comparisonTarget = 0;
    let comparisonOperator = '';
    for (let token of tokens) {
      token = token.toLowerCase();
      if (token.includes('d')) {
        const diceRegex = /^(\d*)d(\d+)([hl])?(\d+)?$/;
        const match = token.match(diceRegex);
        
        if (match) {
          const count = parseInt(match[1]) || 1;
          const sides = parseInt(match[2]);
          const dropType = match[3];
          const dropCount = match[4] ? parseInt(match[4]) : 0;
          let rolls = [];
          for (let r = 0; r < count; r++) {
            rolls.push(Math.floor(Math.random() * sides) + 1);
          }
          let sortedRolls = [...rolls].sort((a, b) => a - b);
          let droppedIndices: number[] = [];
          
          if (dropType === 'l' && dropCount > 0) {
            const toDrop = sortedRolls.slice(0, dropCount);
            let used = new Set();
            toDrop.forEach(val => {
              const idx = rolls.findIndex((r, i) => r === val && !used.has(i));
              droppedIndices.push(idx); used.add(idx);
            });
          } else if (dropType === 'h' && dropCount > 0) {
            const toDrop = sortedRolls.slice(count - dropCount);
            let used = new Set();
            toDrop.forEach(val => {
              const idx = rolls.findIndex((r, i) => r === val && !used.has(i));
              droppedIndices.push(idx); used.add(idx);
            });
          }
          let keptSum = 0;
          let rollStrings = [];
          for (let r = 0; r < rolls.length; r++) {
            if (droppedIndices.includes(r)) {
              rollStrings.push(`<span class="dropped-dice">${rolls[r]}</span>`);
            } else {
              keptSum += rolls[r];
              rollStrings.push(`<span>${rolls[r]}</span>`);
            }
          }
          mathExpression += keptSum;
          detailsHtml += `[${rollStrings.join(', ')}] `;
        }
      } else if (token === '>' || token === '<') {
        hasComparison = true;
        comparisonOperator = token;
        detailsHtml += ` ${token} `;
      } else if (['+', '-', '*', '/'].includes(token)) {
        mathExpression += token;
        detailsHtml += ` ${token} `;
      } else {
        if (hasComparison) {
          comparisonTarget = parseInt(token);
        } else {
          mathExpression += token;
        }
        detailsHtml += `${token} `;
      }
    }
    let finalTotal = 0;
    try {
      finalTotal = new Function(`return ${mathExpression}`)();
    } catch(e) {
      return { text: `Error calculating roll.`, isComparison: false, isSuccess: false };
    }
    let isSuccess = false;
    let resultString = '';
    if (hasComparison) {
      if (comparisonOperator === '>') isSuccess = finalTotal > comparisonTarget;
      if (comparisonOperator === '<') isSuccess = finalTotal < comparisonTarget;
      resultString = `${detailsHtml} (Total: ${finalTotal})`;
    } else {
      resultString = `${detailsHtml} = <strong>${finalTotal}</strong>`;
    }
    return { text: resultString, isComparison: hasComparison, isSuccess };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}