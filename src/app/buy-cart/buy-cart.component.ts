import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-buy-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './buy-cart.component.html',
  styleUrl: './buy-cart.component.scss',
})
export class BuyCartComponent {
  customer = {
    name: '',
    address: '',
    phone: '',
  };

  carts: Cart[] = [
    new Cart({ id: 1, name: '書籍 A', price: 2000, specialPrice: 1580, qty: 1 }),
    new Cart({ id: 2, name: '書籍 B', price: 1580, qty: 2 }),
  ];

  cartsTotal() {
    return this.carts.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
  }

  remove(i: number) {
    this.carts.splice(i, 1);
  }

  canCheckout() {
    // 三個欄位都要有值、購物車不能是空的
    return this.customer.name && this.customer.address && this.customer.phone && this.carts.length > 0;
  }

  checkout() {
    alert('訂單已送出');
    // TODO: 清空購物車或跳轉頁面
  }
}
