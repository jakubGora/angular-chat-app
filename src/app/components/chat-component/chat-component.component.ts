import { Message } from '../../interfaces/Message';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faArrowRightFromBracket,
  IconDefinition,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.scss'],
})
export class ChatComponentComponent implements OnInit {
  faPaperPlane: IconDefinition = faPaperPlane;
  typingUser: string | null = null;
  inputMsgForm = this.formBuilder.group({
    inputMessage: '',
  });
  messageArray: Message[] = [];

  @ViewChild('chatList') chatListElement!: ElementRef<HTMLUListElement>;

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) {
    this.chatService.socket.connect();
    this.chatService.sendMessage('connect', this.getUsername());
    this.chatService.sendMessage('add user', this.getUsername());
  }

  ngOnInit() {
    this.getMessage('connect', () =>
      this.chatService.sendMessage('add user', this.getUsername())
    );

    this.getMessage('new message', (data: Message) => {
      this.messageArray.push({
        username: data.username,
        message: data.message,
        type: 'msg',
      });
      this.scrollDownChatList();
    });

    this.getMessage('user joined', (data: Message) => {
      this.messageArray.push({
        username: data.username,
        message: ' joined',
        type: 'log',
      });
    });

    this.getMessage('user left', (data: Message) => {
      this.messageArray.push({
        username: data.username,
        message: ' left',
        type: 'log',
      });
    });

    this.getMessage(
      'typing',
      (data: Message) => (this.typingUser = data.username!)
    );

    this.getMessage('stop typing', () => (this.typingUser = null));
  }

  getMessage(messageType: string, fun: (data: Message) => void) {
    this.chatService.getMessage(messageType).subscribe((data) => fun(data));
  }

  getUsername() {
    return this.chatService.getUsername();
  }

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
    this.scrollDownChatList();
  }

  startTyping() {
    this.chatService.sendMessage('typing', '');
  }
  stopTyping() {
    this.chatService.sendMessage('stop typing', '');
  }

  scrollDownChatList() {
    setTimeout(() => {
      this.chatListElement.nativeElement.scroll({
        top: this.chatListElement.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  }
}
