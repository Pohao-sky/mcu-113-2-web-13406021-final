import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { booleanAttribute, Component, HostBinding, input, numberAttribute, output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-product-card',
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  readonly id = input.required<number, string | number>({ transform: numberAttribute });

  readonly productName = input<string>();

  readonly authors = input<string[]>();

  readonly company = input<string>();

  readonly isShow = input.required<boolean, string | boolean>({ transform: booleanAttribute });

  readonly photoUrl = input<string>();

  readonly createDate = input<Date>();

  readonly price = input<number, string | number>(0, { transform: numberAttribute });

  readonly specialPrice = input<number, string | number | undefined>(undefined, { transform: numberAttribute });

  readonly view = output<void>();

  @HostBinding('class')
  class = 'app-product-cart';

  showAddCartMsg = false; // 控制提示顯示

  constructor(private cartService: CartService) {}

  addToCart() {
    const cartItem = new Cart({
      id: String(this.id()),
      name: this.productName(),
      price: this.price(),
      specialPrice: this.specialPrice(),
      qty: 1,
    });
    this.cartService.add(cartItem);

    // 顯示提示訊息
    this.showAddCartMsg = true;
    setTimeout(() => {
      this.showAddCartMsg = false;
    }, 500);
  }
}
