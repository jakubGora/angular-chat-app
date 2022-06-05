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
  inputMsgForm = this.formBuilder.group({
    inputMessage: '',
  });

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  getUsername() {
    return this.chatService.getUsername();
  }

  onSubmit() {
    console.log(this.inputMsgForm.value.inputMessage);
    this.inputMsgForm.reset();
  }

  logout() {
    this.chatService.logout();
  }
}
