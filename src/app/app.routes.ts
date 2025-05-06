import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { BuyCartComponent } from './buy-cart/buy-cart.component';

export const routes: Routes = [
  { path: 'products', component: ProductPageComponent },
  { path: 'buy', component: BuyCartComponent },
];
