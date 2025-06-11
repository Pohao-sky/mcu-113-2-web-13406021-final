import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartRemoteService {
  private readonly url = 'http://localhost:3001/carts';

  private readonly httpClient = inject(HttpClient);

  getCartList() {
    return this.httpClient.get<Cart[]>(this.url);
  }
}
