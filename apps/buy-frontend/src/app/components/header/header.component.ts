import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../stores/cart.store';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartStore = inject(CartStore);
  auth = inject(AuthService);
  showUserMenu = false;
  currentUser$ = this.auth.currentUser$;

  get cartItemCount() {
    return this.cartStore.totalItems();
  }

  getUserPhotoUrl(user: any): string {
    if (!user) return '';
    if (user.photoURL) return user.photoURL;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email?.split('@')[0] || 'User')}&background=FF9900&color=fff`;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  async logout() {
    try {
      await this.auth.logout();
      this.showUserMenu = false;
    } catch (err) {
      console.error('logout error:', err);
    }
  }
}
