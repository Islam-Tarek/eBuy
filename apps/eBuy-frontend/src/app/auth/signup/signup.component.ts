import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  async onSubmit() {
    try {
      await this.auth.signup(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Signup error:', error);
    }
  }

  async signupWithGoogle() {
    try {
      await this.auth.googleSignIn();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Google signup error:', error);
    }
  }

  async googleSignIn() {
    try {
      const user = await this.auth.googleSignIn();
      if (user) {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  }
}