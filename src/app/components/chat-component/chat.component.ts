import { Message } from '../../interfaces/Message';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {
  IconDefinition,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  typingUser: string | null = null;

  constructor(private chatService: ChatService) {
    this.chatService.socket.connect();
    this.chatService.sendMessage('connect', this.getUsername());
    this.chatService.sendMessage('add user', this.getUsername());
  }

  ngOnInit(): void {
    this.getMessage('new message', (data: Message) => {
      this.chatService.addToMessageArray({
        username: data.username,
        message: data.message,
        type: 'msg',
      });
      this.scrollDownChatList();
    });

    this.getMessage('user joined', (data: Message) => {
      this.chatService.addToMessageArray({
        username: data.username,
        message: ' joined',
        type: 'log',
      });
    });

    this.getMessage('user left', (data: Message) => {
      this.chatService.addToMessageArray({
        username: data.username,
        message: ' left',
        type: 'log',
      });
    });

    this.getMessage('typing', (data: Message) => {
      this.typingUser = data.username!;
      this.scrollDownChatList();
    });

    this.getMessage('stop typing', () => (this.typingUser = null));
  }

  getMessage(messageType: string, fun: (data: Message) => void): void {
    this.chatService.getMessage(messageType).subscribe((data) => fun(data));
  }

  getUsername(): string {
    return this.chatService.getUsername();
  }

  startTyping(): void {
    this.chatService.sendMessage('typing', '');
  }
  stopTyping(): void {
    this.chatService.sendMessage('stop typing', '');
  }

  scrollDownChatList(): void {
    let chatListElement: HTMLUListElement = document.getElementsByClassName(
      'messages'
    )[0] as HTMLUListElement;
    setTimeout(() => {
      chatListElement.scroll({
        top: chatListElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  }

  getMessageArray(): Message[] {
    return this.chatService.getMessageArray();
  }
}
