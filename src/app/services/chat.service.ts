import { Message } from './../interfaces/Message';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  private username: string = '';
  private messageArray: Message[] = [];

  constructor(public socket: Socket, private router: Router) {
    this.initialChat();
  }
  ngOnInit(): void {}

  initialChat(): void {
    if (localStorage.getItem('username')?.length! > 0) {
      this.username = localStorage.getItem('username')!;
      this.router.navigate(['/', 'chat']);
    } else {
      this.router.navigate(['/']);
    }
  }

  sendMessage(type: string, msg: string) {
    this.socket.emit(type, msg);
  }
  getMessage(msg: string) {
    return this.socket.fromEvent(msg).pipe(map((data) => data as Message));
  }

  setUsername(username: string): void {
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string {
    return this.username;
  }

  getMessageArray(): Message[] {
    return this.messageArray;
  }

  addToMessageArray(msg: Message) {
    this.messageArray.push(msg);
  }

  logout(): void {
    this.messageArray = [];
    this.socket.disconnect();
    this.setUsername('');
    this.initialChat();
  }
}
