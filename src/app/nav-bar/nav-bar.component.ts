import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  cartCount = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((list) => {
      this.cartCount = list.reduce((sum, item) => sum + (item.qty || 1), 0); // 顯示總數量
    });
  }
}
