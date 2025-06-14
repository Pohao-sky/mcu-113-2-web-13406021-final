import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-buy-cart',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './buy-cart.component.html',
  styleUrl: './buy-cart.component.scss',
})
export class BuyCartComponent implements OnInit {
  ngOnInit(): void {
    this.carts = this.cartService.getList();
    this.updateState();

    this.customerForm.valueChanges.subscribe(() => this.updateState());
  }

  // 基本資料
  customerForm = inject(FormBuilder).group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
  });

  //購物車資料
  private cartService = inject(CartService);

  carts: Cart[] = [];
  canCheckout = false;

  // cartsTotal 改成 getter
  get cartsTotal(): number {
    return this.carts.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.qty, 0);
  }

  remove(i: number) {
    this.carts.splice(i, 1);
    this.updateState();
  }

  updateState() {
    this.canCheckout = this.customerForm.valid && this.carts.length > 0;
  }

  checkout() {
    alert('訂單已送出');
    // TODO: 清空購物車或跳轉頁面
  }
}
