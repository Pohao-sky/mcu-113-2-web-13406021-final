import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-buy-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './buy-cart.component.html',
  styleUrl: './buy-cart.component.scss',
})
export class BuyCartComponent implements OnInit {
  //基本資料
  customer = {
    name: '',
    address: '',
    phone: '',
  };

  canCheckout() {
    return this.customer.name && this.customer.address && this.customer.phone && this.carts.length > 0;
  }

  //購買項目
  private cartService = inject(CartService);

  carts: Cart[] = [];

  ngOnInit(): void {
    this.carts = this.cartService.getList();
  }

  cartsTotal() {
    return this.carts.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
  }

  remove(i: number) {
    this.carts.splice(i, 1);
  }

  checkout() {
    alert('訂單已送出');
    // TODO: 清空購物車或跳轉頁面
  }
}
