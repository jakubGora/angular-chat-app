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
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {
  public inputMsgForm = this.formBuilder.group({
    inputMessage: '' as string,
  });
  public faPaperPlane: IconDefinition = faPaperPlane;
  public faFaceSmile: IconDefinition = faFaceSmile;
  public emojisActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.emojisActive = false;
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
    }, 500);
  }

  addEmoji(event: MouseEvent): void {
    let elem = event.target as HTMLElement;
    this.inputMsgForm.setValue({
      inputMessage: this.inputMsgForm.value.inputMessage + elem.innerHTML,
    });
  }
}
