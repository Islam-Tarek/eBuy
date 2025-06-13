import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { OrderStore } from '../../stores/order.store';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-checkout-failure',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-failure.component.html',
})
export class CheckoutFailureComponent implements OnInit {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  platFormId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformServer(this.platFormId)) {
      return;
    }
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.orderStore.setError("Can't find this order ID");
      return;
    }
    this.orderStore.removeUnpaidOrder(orderId);
  }
}
