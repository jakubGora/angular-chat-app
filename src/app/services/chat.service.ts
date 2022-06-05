import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private username: string = '';

  constructor(private router: Router) {
    this.initialChat();
  }

  initialChat(): void {
    if (localStorage.getItem('username')?.length! > 0) {
      this.username = localStorage.getItem('username')!;
      this.router.navigate(['/', 'chat']);
    } else {
      this.router.navigate(['/']);
    }
  }

  setUsername(username: string): void {
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string {
    return this.username;
  }

  logout(): void {
    this.setUsername('');
    this.initialChat();
  }
}
