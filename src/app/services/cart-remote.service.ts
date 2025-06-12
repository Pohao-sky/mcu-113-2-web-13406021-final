import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartRemoteService {
  private readonly url = 'http://localhost:3001/carts';
  private readonly http = inject(HttpClient);

  // 取得購物車全部
  getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url);
  }

  deleteCart(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  addToCart(newItem: Cart): Observable<any> {
    // 先找同 id
    return this.http.get<Cart[]>(`${this.url}?id=${newItem.id}`).pipe(
      switchMap((found) => {
        if (found && found.length > 0) {
          // 有的話 qty 合併（通常 id 唯一，found[0] 即可）
          const exist = found[0];
          const updateUrl = `${this.url}/${exist.id}`;
          const newQty = exist.qty + (newItem.qty || 1);
          return this.http.patch(updateUrl, { qty: newQty });
        } else {
          // 沒有就新增
          return this.http.post(this.url, { ...newItem, qty: 1 });
        }
      })
    );
  }
}
