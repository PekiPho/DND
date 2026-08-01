import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject, Observable } from 'rxjs';

export interface ChatMessage {
  id?: number;
  username: string;
  message: string;
  isRoll?: boolean;
  isComparison?: boolean;
  isSuccess?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: Socket;
  private messageSubject = new Subject<ChatMessage>();
  private moreMessagesSubject = new Subject<ChatMessage[]>();

  public messages$: Observable<ChatMessage> = this.messageSubject.asObservable();
  public moreMessages$: Observable<ChatMessage[]> = this.moreMessagesSubject.asObservable();


  constructor() {
    this.socket = io('http://localhost:3030'); 
    this.socket.on('chatMessage', (data: ChatMessage) => {
      this.messageSubject.next(data);
    });
    this.socket.on('moreMessagesLoaded', (data: ChatMessage[]) => {
      this.moreMessagesSubject.next(data);
    });
  }

  joinRoom(roomId: string,username: string) {
    this.socket.emit('joinRoom', {roomId,username});
  }

  loadMoreMessages(roomId: string, beforeId: number) {
    this.socket.emit('loadMoreMessages', { roomId, beforeId });
  }

  sendMessage(roomId: string, message: string, username: string, isRoll = false, isComparison = false, isSuccess = false, senderId?: number) {
    this.socket.emit('chatMessage', { roomId, message, username, isRoll, isComparison, isSuccess, senderId });
  }
}