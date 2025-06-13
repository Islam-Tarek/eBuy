import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStore } from '../../stores/order.store';
import { ActivatedRoute, Router } from '@angular/router';
import { CartStore } from '../../stores/cart.store';
import { switchMap, map, pipe } from 'rxjs';
import { OrderStatus } from '../../types/order.types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { OrderDetailComponent } from '../../components/order-detail/order-detail.component';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule, OrderDetailComponent],
  templateUrl: './checkout-success.component.html',
})
export class CheckoutSuccessComponent implements OnInit {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cartStore = inject(CartStore);

  getAndUpdateOrder = rxMethod<string>(
    pipe(
      switchMap((orderId) => this.orderStore.getOrder(orderId)),
      map((order) => {
        if (order.status === OrderStatus.PAYMENT_REQUIRED) {
          return this.orderStore.updateOrder({
            id: order.id,
            status: OrderStatus.PAID,
          });
        }
        return null;
      })
    )
  );

  constructor() {
    afterNextRender(() => {
      this.cartStore.clearCart();
    });
  }

  ngOnInit() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    this.getAndUpdateOrder(orderId);
  }

  continueShopping() {
    this.router.navigate(['/']);
  }
}
