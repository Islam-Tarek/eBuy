import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../stores/cart.store';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Product } from '@prisma/client';

type CartItem = Product & {
  quantity: number;
};

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartStore = inject(CartStore);
  auth = inject(AuthService);

  updateQuantity(id: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value);
    if (quantity > 0) {
      this.cartStore.updateQuantity(id, quantity);
    } else {
      const item = this.cartStore.items().find(item => item.id === id);
      if (item) {
        input.value = item.quantity.toString();
      }
    }
  }

  increaseQuantity(item: CartItem) {
    this.cartStore.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartStore.updateQuantity(item.id, item.quantity - 1);
    }
  }
}
