export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  PAID = 'PAID'
}

export interface Order {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stripePriceId: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// NG0751: Angular has detected that this application contains `@defer` blocks and the hot module replacement (HMR) mode is enabled. All `@defer` block dependencies will be loaded eagerly. Find more at https://angular.dev/errors/NG0751