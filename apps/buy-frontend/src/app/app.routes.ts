import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      const mod = await import('./home/home.component');
      return mod.HomeComponent;
    },
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadComponent: async () => {
      const mod = await import('./products/products.component');
      return mod.ProductsComponent;
    },
  },
  {
    path: 'cart',
    pathMatch: 'full',
    loadComponent: async () => {
      const mod = await import('./cart/cart.component');
      return mod.CartComponent;
    },
  },
  {
    path: 'checkout',
    pathMatch: 'full',
    loadComponent: async () => {
      const mod = await import('./checkout/checkout.component');
      return mod.CheckoutComponent;
    },
  },
  {
    path: 'checkout/cancel',
    pathMatch: 'full',
    loadComponent: async () => {
      const mod = await import(
        './checkout/checkout-failure/checkout-failure.component'
      );
      return mod.CheckoutFailureComponent;
    },
  },

  {
    path: 'checkout/success',
    pathMatch: 'full',
    loadComponent: async () => {
      const mod = await import(
        './checkout/checkout-success/checkout-success.component'
      );
      return mod.CheckoutSuccessComponent;
    },
  },
];
