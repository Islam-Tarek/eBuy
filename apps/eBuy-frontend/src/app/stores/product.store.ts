import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../types/order.types';
import { Apollo, gql } from 'apollo-angular';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, map, tap, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import { pipe } from 'rxjs';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      image
      stripePriceId
    }
  }
`;

const SEARCH_PRODUCTS = gql`
  query SearchProducts($term: String!) {
    searchProducts(term: $term) {
      id
      name
      description
      price
      image
      stripePriceId
    }
  }
`;

const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts($featured: Boolean) {
    products(featured: $featured) {
      id
      name
      description
      price
      image
      stripePriceId
    }
  }
`;

export interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
};

export const ProductStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadProducts() {
      // Only set loading if we don't have products
      if (store.products().length === 0) {
        patchState(store, { loading: true, error: null });
      }
      
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          fetchPolicy: 'cache-first'
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) =>
              patchState(store, { products: data.products, loading: false }),
            error: (error) =>
              patchState(store, { error: error.message, loading: false }),
          })
        )
        .subscribe();
    },
    getFeaturedProducts: rxMethod<boolean>(
      pipe(
        switchMap((featured) =>
          apollo.query<{ featuredProducts: Product[] }>({
            query: GET_FEATURED_PRODUCTS,
            variables: { featured },
            fetchPolicy: 'cache-first'
          })
        ),
        tap({
          next: ({ data }) =>
            patchState(store, {
              featuredProducts: data.featuredProducts,
              loading: false,
              error: null,
            }),
          error: (error) =>
            patchState(store, { error: error.message, loading: false }),
        })
      )
    ),
    searchProducts(term: string) {
      patchState(store, { loading: true, error: null });
      apollo
        .query<{ searchProducts: Product[] }>({
          query: SEARCH_PRODUCTS,
          variables: { term },
          fetchPolicy: 'network-only'
        })
        .pipe(
          map(({ data }) =>
            patchState(store, { products: data.searchProducts, loading: false })
          ),
          catchError((error) => {
            patchState(store, { error: error.message, loading: false });
            return EMPTY;
          })
        )
        .subscribe();
    },
  }))
);
