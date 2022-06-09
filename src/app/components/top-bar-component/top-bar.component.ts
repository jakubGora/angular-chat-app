import { ChatService } from '../../services/chat.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/interfaces/Message';
import {
  faArrowRightFromBracket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar-component',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
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

  addParticipantsMessage = (data: Message): void => {
    let message: string = '';
    if (data.numUsers === 1) {
      message += "There's 1 participant";
    } else {
      message += 'There are ' + data.numUsers + ' participants';
    }
    this.participantsMessage = message;
  };

  getMessage(messageType: string, fun: (data: Message) => void): void {
    this.chatService.getMessage(messageType).subscribe((data) => fun(data));
  }

  getUsername(): string {
    return this.chatService.getUsername();
  }
  logout(): void {
    this.chatService.logout();
  }
}
