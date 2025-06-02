import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { BuyCartComponent } from './buy-cart/buy-cart.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { productResolver } from './resolver/product.resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'product/view/:id', component: ProductDetailPageComponent, resolve: { product: productResolver } },
  { path: 'buy', component: BuyCartComponent },
];
