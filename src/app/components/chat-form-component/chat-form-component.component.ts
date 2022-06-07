import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faPaperPlane,
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

  @Input()
  chatListElement!: ElementRef<HTMLUListElement>;

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
      this.inputMsgForm.reset();
      this.scrollDownChatList();
    }
  }

  scrollDownChatList(): void {
    setTimeout(() => {
      this.chatListElement.nativeElement.scroll({
        top: this.chatListElement.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  }
}
