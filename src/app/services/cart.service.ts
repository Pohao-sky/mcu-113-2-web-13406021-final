import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _data: Cart[] = [
    new Cart({ id: '1', name: '書籍 A', price: 2000, specialPrice: 1580, qty: 1 }),
    new Cart({ id: '2', name: '書籍 B', price: 1580, qty: 2 }),
  ];

  getList(): Cart[] {
    return this._data;
  }
}
