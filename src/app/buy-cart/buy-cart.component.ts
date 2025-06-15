import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-buy-cart',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './buy-cart.component.html',
  styleUrls: ['./buy-cart.component.scss'],
})
export class BuyCartComponent implements OnInit {
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.carts = this.cartService.getList();
    this.updateState();

    this.customerForm.valueChanges.subscribe(() => this.updateState());
  }

  // 基本資料
  customerForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
  });

  // 購物車
  private cartService = inject(CartService);
  carts: Cart[] = [];
  canCheckout = false;

  onQtyChange(i: number, value: string) {
    const qty = parseInt(value, 10);
    if (!isNaN(qty) && qty > 0) {
      this.carts[i].qty = qty;
      this.updateState();
    }
  }

  remove(i: number) {
    this.cartService.remove(i);
    this.carts = this.cartService.getList();
    this.updateState();
  }

  updateState() {
    this.canCheckout = this.customerForm.valid && this.carts.length > 0;
  }

  // 計算總額
  get cartsTotal(): number {
    return this.carts.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
  }

  checkout() {
    alert('訂單已送出');
    // TODO: 清空購物車或跳轉頁面
  }
}
