import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from '../components/order-detail/order-detail.component';
import { OrderStore } from '../stores/order.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, pipe, tap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-order',
  imports: [CommonModule, OrderDetailComponent, RouterLink],
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  
  getOrder = rxMethod<string>(
    pipe(
      tap(() => this.orderStore.setError('')),
      switchMap((orderId) => this.orderStore.getOrder(orderId))
    )
  );

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    // const token = await this.auth.getToken();
    this.getOrder(orderId);
  }
}
