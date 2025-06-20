import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private api = 'http://localhost:3001/orders'; // 指向 order.json 的 port

  constructor(private http: HttpClient) {}

  createOrder(order: any) {
    return this.http.post(this.api, order);
  }
}
