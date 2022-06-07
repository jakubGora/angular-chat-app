import { ChatService } from './../../services/chat.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/interfaces/Message';
import {
  faArrowRightFromBracket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar-component',
  templateUrl: './top-bar-component.component.html',
  styleUrls: ['./top-bar-component.component.scss'],
})
export class TopBarComponentComponent implements OnInit {
  participantsMessage: string = '';
  faArrowRightFromBracket: IconDefinition = faArrowRightFromBracket;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.getMessage('user joined', (data: Message) => {
      this.addParticipantsMessage(data);
    });

    this.getMessage('user left', (data: Message) => {
      this.addParticipantsMessage(data);
    });

    this.getMessage('login', (data: Message) =>
      this.addParticipantsMessage(data)
    );
  }

  addParticipantsMessage = (data: Message) => {
    let message = '';
    if (data.numUsers === 1) {
      message += "There's 1 participant";
    } else {
      message += 'There are ' + data.numUsers + ' participants';
    }
    this.participantsMessage = message;
  };

  getMessage(messageType: string, fun: (data: Message) => void) {
    this.chatService.getMessage(messageType).subscribe((data) => fun(data));
  }

  getUsername() {
    return this.chatService.getUsername();
  }
  logout() {
    this.chatService.logout();
  }
}
