import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faPaperPlane,
  faFaceSmile,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chat-form-component',
  templateUrl: './chat-form-component.component.html',
  styleUrls: ['./chat-form-component.component.scss'],
})
export class ChatFormComponentComponent implements OnInit {
  inputMsgForm = this.formBuilder.group({
    inputMessage: '' as string,
  });
  faPaperPlane: IconDefinition = faPaperPlane;
  faFaceSmile: IconDefinition = faFaceSmile;

  emojisActive: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.inputMsgForm.value.inputMessage) {
      this.chatService.addToMessageArray({
        username: this.chatService.getUsername(),
        message: this.inputMsgForm.value.inputMessage!,
        type: 'msg',
      });
      this.chatService.sendMessage(
        'new message',
        this.inputMsgForm.value.inputMessage!
      );
      this.inputMsgForm.setValue({ inputMessage: '' });
      this.scrollDownChatList();
    }
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
    }, 1000);
  }

  addEmoji(event: MouseEvent): void {
    let elem = event.target as HTMLElement;
    this.inputMsgForm.setValue({
      inputMessage: this.inputMsgForm.value.inputMessage + elem.innerHTML,
    });
  }
}
