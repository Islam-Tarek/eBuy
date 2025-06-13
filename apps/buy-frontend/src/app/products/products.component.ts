import { afterNextRender, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../stores/product.store';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CartStore } from '../stores/cart.store';
import { Product } from '@prisma/client';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  searchTerm = '';
  productStore = inject(ProductStore);
  cartStore = inject(CartStore);
  searchSubject = new Subject<string>();

  constructor() {
    // Load products only if they haven't been loaded yet
    if (this.productStore.products().length === 0) {
      this.productStore.loadProducts();
    }

    // Set up search with debounce
    afterNextRender(() => {
      this.searchSubject
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((term) => {
          if (term) {
            this.productStore.searchProducts(term);
          } else {
            this.productStore.loadProducts();
          }
        });
    });
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  addToCart(product: Product) {
    this.cartStore.addToCart(product);
  }
}
