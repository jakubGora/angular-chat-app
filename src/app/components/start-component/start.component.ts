import { ChatService } from '../../services/chat.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  @ViewChild('nameInput')
  public nameInputElement: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.nameInputElement?.nativeElement.focus();
  }

  checkoutForm = this.formBuilder.group({
    name: '',
  });

  onBlur(): void {
    this.nameInputElement?.nativeElement.focus();
  }

  onSubmit(): void {
    if (this.checkoutForm.value.name) {
      this.chatService.setUsername(this.checkoutForm.value.name);
      this.router.navigate(['/', 'chat']);
    }
  }
}
