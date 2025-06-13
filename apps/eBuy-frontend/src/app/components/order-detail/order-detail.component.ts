import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderWithItems } from '../../stores/order.store';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent {
  order = input.required<OrderWithItems | null>();
}
