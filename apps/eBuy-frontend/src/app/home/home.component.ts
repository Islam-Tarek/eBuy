import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { Product } from '../types/order.types';
import { ProductStore } from '../stores/product.store';
import { CartStore } from '../stores/cart.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  productStore = inject(ProductStore);
  cartStore = inject(CartStore);

  constructor() {
    this.productStore.getFeaturedProducts(true);
  }

  onAddToCart(product: Product) {
    this.cartStore.addToCart(product);
  }
}
