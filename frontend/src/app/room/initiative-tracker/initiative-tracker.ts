import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/services/chat';
import { AuthService } from '../../core/services/auth';
import { Token } from '../../core/models/token.model';


@Component({
  selector: 'app-initiative-tracker',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './initiative-tracker.html',
  styleUrl: './initiative-tracker.scss',
})
export class InitiativeTracker implements OnInit {
  @Input() isHost = false;
  @Input() roomId!: string;

  private chatService = inject(ChatService);
  private authService = inject(AuthService);

  currentRound = 1;
  activeTurnIndex = 0;
  sortAscending = false;
  preserveOrder = true;;

  showAddDropdown = false;
  customTokenName = '';

  tokens: Token[]=[];

  get combatants(): Token[]{
    return this.tokens.filter(t => t.inCombat);
  }

  get availableMapTokens(): Token[] {
    return this.tokens.filter(t => !t.inCombat);
  }

  ngOnInit(): void {
    this.sortInitiative();
  }

  nextTurn(){
    if(this.combatants.length === 0) return;

    if(!this.preserveOrder){
      const currentToken= this.combatants[this.activeTurnIndex];

      if(currentToken){
        currentToken.inCombat=false;
      }
      if (this.combatants.length === 0) {
        this.currentRound++;
        this.activeTurnIndex = 0;
        return;
      }
    }
    else{
      this.activeTurnIndex++;
      if (this.activeTurnIndex >= this.combatants.length) {
        this.activeTurnIndex = 0;
        this.currentRound++;
      }
    }
  }

  prevTurn() {
    if (this.combatants.length === 0) return;
    this.activeTurnIndex--;
    if (this.activeTurnIndex < 0) {
      this.activeTurnIndex = this.combatants.length - 1;
      if (this.currentRound > 1) this.currentRound--;
    }
  }

  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.sortInitiative();
  }

  sortInitiative() {
    this.tokens.sort((a, b) => {
      const initA = a.initiative ?? 0;
      const initB = b.initiative ?? 0;
      return this.sortAscending ? initA - initB : initB - initA;
    });
    this.activeTurnIndex = 0;
  }

  addMapTokenToCombat(token: Token) {
    token.inCombat = true;
    this.showAddDropdown = false;
    this.sortInitiative();
  }

  addCustomCombatant() {
    if (!this.customTokenName.trim()) return;
    const newToken: Token = {
      id: Date.now(),
      gridX: 0, gridY: 0,
      widthSquares: 1, heightSquares: 1,
      scaleX: 1, scaleY: 1, rotation: 0, zIndex: 1,
      inCombat: true,
      initiative: 0,
      name: this.customTokenName
    };
    this.tokens.push(newToken);
    this.customTokenName = '';
    this.showAddDropdown = false;
    this.sortInitiative();
  }

  addFromCharacterSheet(characterName: string, initiativeScore: number, imageUrl?: string) {
    let existingToken = this.tokens.find(t => t.name === characterName);
    if (existingToken) {
      existingToken.initiative = initiativeScore;
      existingToken.inCombat = true;
    } else {
      const newToken: Token = {
        id: Date.now(),
        gridX: 0, gridY: 0,
        widthSquares: 1, heightSquares: 1,
        scaleX: 1, scaleY: 1, rotation: 0, zIndex: 1,
        inCombat: true,
        initiative: initiativeScore,
        name: characterName,
        imageUrl: imageUrl
      };
      this.tokens.push(newToken);
    }
    this.sortInitiative();
  }

  updateInitiativeValue(token: Token, event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    token.initiative = isNaN(val) ? 0 : val;
    this.sortInitiative();
  }

  removeFromCombat(token: Token) {
    token.inCombat = false;
    if (this.activeTurnIndex >= this.combatants.length) {
      this.activeTurnIndex = Math.max(0, this.combatants.length - 1);
    }
  }

  resetCombat() {
    this.currentRound = 1;
    this.activeTurnIndex = 0;
    this.tokens.forEach(t => t.inCombat = false);
  }
}
