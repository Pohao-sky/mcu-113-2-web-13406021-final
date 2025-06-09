import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  cart = [
    { id: '1', name: '書籍 A', price: 2000, specialPrice: 1580, qty: 1 },
    { id: '2', name: '書籍 B', price: 1580, qty: 2 },
  ];

  cartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
  }

  remove(i: number) {
    this.cart.splice(i, 1);
  }

  canCheckout() {
    // 三個欄位都要有值、購物車不能是空的
    return this.customer.name && this.customer.address && this.customer.phone && this.cart.length > 0;
  }

  checkout() {
    alert('訂單已送出');
    // TODO: 清空購物車或跳轉頁面
  }
}
