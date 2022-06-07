import { ChatService } from '../../services/chat.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-component',
  templateUrl: './start-component.component.html',
  styleUrls: ['./start-component.component.scss'],
})
export class StartComponentComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  @ViewChild('nameInput') nameInputElement!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.nameInputElement.nativeElement.focus();
  }

  checkoutForm = this.formBuilder.group({
    name: '',
  });

  onBlur() {
    this.nameInputElement.nativeElement.focus();
  }

  onSubmit(): void {
    if (this.checkoutForm.value.name) {
      this.chatService.setUsername(this.checkoutForm.value.name);
      this.router.navigate(['/', 'chat']);
    }
  }
}
