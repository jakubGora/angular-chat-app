import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-component',
  templateUrl: './start-component.component.html',
  styleUrls: ['./start-component.component.scss'],
})
export class StartComponentComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  checkoutForm = this.formBuilder.group({
    name: '',
  });

  onSubmit(): void {
    if (this.checkoutForm.value.name) {
      localStorage.setItem('nickname', this.checkoutForm.value.name);
      this.router.navigate(['/', 'chat']);
    }
  }
}
