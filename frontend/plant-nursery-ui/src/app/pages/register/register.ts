
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';

  constructor(private router: Router) {}

  register(): void {
    this.message = '';

    if (!this.name.trim() || !this.email.trim() ||
        !this.password || !this.confirmPassword) {
      this.message = 'Please fill in all fields.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.message = 'Please enter a valid email address.';
      return;
    }

    if (this.password.length < 6) {
      this.message = 'Password must contain at least 6 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    this.router.navigate(['/']);
  }
}
