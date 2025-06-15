// cart.service.ts
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

const STORAGE_KEY = 'cart-data';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // 購物車內的商品
  private _data: Cart[] = [];

  constructor() {
    this._data = this.readStorage();
  }

  // 讀取 localStorage
  private readStorage(): Cart[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        // 轉成 Cart 實例陣列
        return (JSON.parse(raw) as any[]).map((item) => new Cart(item));
      } catch {
        return [];
      }
    }
    return [];
  }

  // 寫入 localStorage
  private writeStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
  }

  // 取得購物車內容
  getList(): Cart[] {
    // 每次都回傳記憶體資料（如要即時同步，可以直接 readStorage()）
    return this._data;
  }

  // 新增商品（或合併數量）
  add(item: Cart) {
    const idx = this._data.findIndex((i) => i.id === item.id);
    if (idx > -1) {
      // 已存在，合併數量
      this._data[idx].qty += item.qty;
    } else {
      this._data.push(item);
    }
    this.writeStorage();
  }

  // 修改商品數量
  updateQty(idx: number, qty: number) {
    if (idx >= 0 && idx < this._data.length) {
      this._data[idx].qty = qty;
      this.writeStorage();
    }
  }

  // 移除商品
  remove(idx: number) {
    if (idx >= 0 && idx < this._data.length) {
      this._data.splice(idx, 1);
      this.writeStorage();
    }
  }

  // 清空購物車（先預留，後面可用）
  clear() {
    this._data = [];
    this.writeStorage();
  }
}
