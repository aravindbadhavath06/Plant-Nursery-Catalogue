
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  login(): void {
    this.message = '';

    if (!this.email.trim() || !this.password) {
      this.message = 'Please enter your email and password.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.message = 'Please enter a valid email address.';
      return;
    }

    // Frontend demo only; real authentication comes with the backend.
    const user = {
  name: this.email.trim().split('@')[0],
  email: this.email.trim()
};

localStorage.setItem('loggedInUser', JSON.stringify(user));

this.router.navigate(['/home']);
  }
}
