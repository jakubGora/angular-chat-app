import { Message } from './../interfaces/Message';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faArrowRightFromBracket,
  IconDefinition,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.scss'],
})
export class ChatComponentComponent implements OnInit {
  faArrowRightFromBracket: IconDefinition = faArrowRightFromBracket;
  faPaperPlane: IconDefinition = faPaperPlane;
  typingUser: string | null = null;
  inputMsgForm = this.formBuilder.group({
    inputMessage: '',
  });
  messageArray: Message[] = [];
  participantsMessage: string = '';
  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.chatService.getMessage('connect').subscribe((data) => {
      this.chatService.sendMessage('add user', this.getUsername());

      console.log(this.chatService.socket.ioSocket.id);
    });

    this.chatService.getMessage('new message').subscribe((data: any) => {
      this.messageArray.push({
        username: data.username,
        message: data.message,
        type: 'msg',
      });
    });

    this.chatService.getMessage('user joined').subscribe((data: any) => {
      this.messageArray.push({
        username: data.username,
        message: ' joined',
        type: 'log',
      });
      this.addParticipantsMessage(data);
    });

    this.chatService.getMessage('user left').subscribe((data: any) => {
      console.log('left');
      this.messageArray.push({
        username: data.username,
        message: ' left',
        type: 'log',
      });
      this.addParticipantsMessage(data);
    });

    this.chatService.getMessage('login').subscribe((data: any) => {
      this.addParticipantsMessage(data);
    });

    this.chatService.getMessage('typing').subscribe((data: any) => {
      this.typingUser = data.username;
    });

    this.chatService.getMessage('stop typing').subscribe((data: any) => {
      this.typingUser = null;
    });
  }

  getUsername() {
    return this.chatService.getUsername();
  }

  addParticipantsMessage = (data: { numUsers: number }) => {
    let message = '';
    if (data.numUsers === 1) {
      message += "There's 1 participant";
    } else {
      message += 'There are ' + data.numUsers + ' participants';
    }
    this.participantsMessage = message;
  };

  onSubmit() {
    if (this.inputMsgForm.value.inputMessage) {
      this.messageArray.push({
        username: this.getUsername(),
        message: this.inputMsgForm.value.inputMessage!,
        type: 'msg',
      });
      this.chatService.sendMessage(
        'new message',
        this.inputMsgForm.value.inputMessage!
      );
      this.inputMsgForm.reset();
    }
    console.log(this.messageArray);
  }

  logout() {
    this.chatService.logout();
  }

  startTyping() {
    this.chatService.sendMessage('typing', '');
  }
  stopTyping() {
    this.chatService.sendMessage('stop typing', '');
  }
}
