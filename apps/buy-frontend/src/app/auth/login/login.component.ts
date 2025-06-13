import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  async onSubmit() {
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login error:', error);
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
