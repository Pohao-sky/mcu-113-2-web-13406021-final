import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartRemoteService } from './cart-remote.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private remote: CartRemoteService) {}

  getList(): Observable<Cart[]> {
    return this.remote.getAll();
  }
}
