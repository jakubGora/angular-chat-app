import { Component, Input, OnInit } from '@angular/core';
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
    inputMessage: '',
  });
  faPaperPlane: IconDefinition = faPaperPlane;

  @Input()
  scrollDownChatList: void | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.inputMsgForm.value.inputMessage) {
      this.chatService.messageArray.push({
        username: this.chatService.getUsername(),
        message: this.inputMsgForm.value.inputMessage!,
        type: 'msg',
      });
      this.chatService.sendMessage(
        'new message',
        this.inputMsgForm.value.inputMessage!
      );
      this.inputMsgForm.reset();
    }
  }
}
