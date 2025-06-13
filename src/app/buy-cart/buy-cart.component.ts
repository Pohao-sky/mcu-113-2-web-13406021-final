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

  //購買項目
  private cartService = inject(CartService);

  carts: Cart[] = [];
  cartsTotal = 0;

  ngOnInit(): void {
    this.carts = this.cartService.getList();
    this.updateState();
  }

  remove(i: number) {
    this.carts.splice(i, 1);
    this.updateState();
  }

  onInputChange() {
    this.updateState();
  }

  //送出訂單
  canCheckout = false;
  updateState() {
    // 算總價
    this.cartsTotal = this.carts.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
    // 檢查能否送出
    this.canCheckout = !!this.customer.name && !!this.customer.address && !!this.customer.phone && this.carts.length > 0;
  }
  checkout() {
    alert('訂單已送出');
    // TODO: 清空購物車或跳轉頁面
  }
}
