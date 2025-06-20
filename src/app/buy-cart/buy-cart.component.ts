import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-buy-cart',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './buy-cart.component.html',
  styleUrls: ['./buy-cart.component.scss'],
})
export class BuyCartComponent implements OnInit {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.carts = this.cartService.getList();
    this.updateState();

    this.customerForm.valueChanges.subscribe(() => this.updateState());
  }

  updateState() {
    this.canCheckout = this.customerForm.valid && this.carts.length > 0;
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
      this.cartService.updateQty(i, qty);
      this.carts = this.cartService.getList();
      this.updateState();
    }
  }

  remove(i: number) {
    this.cartService.remove(i);
    this.carts = this.cartService.getList();
    this.updateState();
  }

  // 送單按鈕
  get cartsTotal(): number {
    return this.carts.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
  }

  checkout() {
    const order = {
      customer: this.customerForm.value,
      items: this.carts,
      total: this.cartsTotal,
      createdAt: new Date().toISOString(),
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        alert('訂單已送出');
        this.cartService.clear();
        this.carts = this.cartService.getList();
        this.customerForm.reset();
        this.updateState();
      },
      error: () => {
        alert('訂單送出失敗，請稍後再試');
      },
    });
  }
}
