import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { CartRemoteService } from '../services/cart-remote.service';

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

  private cartRemoteService = inject(CartRemoteService);

  carts: Cart[] = [];

  ngOnInit(): void {
    this.cartService.getList().subscribe((data) => {
      this.carts = data;
    });
  }

  cartsTotal() {
    return this.carts.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
  }

  remove(i: number) {
    const item = this.carts[i];
    if (!item?.id) return;
    this.cartRemoteService.deleteCart(item.id).subscribe(() => {
      this.carts.splice(i, 1); // 本地也刪
    });
  }

  checkout() {
    alert('訂單已送出');
    // TODO: 清空購物車或跳轉頁面
  }
}
