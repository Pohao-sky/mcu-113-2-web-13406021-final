import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { FormControl } from '@angular/forms';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly product = input.required<Product>();

  readonly router = inject(Router);

  private ProductService = inject(ProductService);

  private destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl<string | undefined>(undefined, { nonNullable: true });

  readonly productName = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)),
    {
      initialValue: undefined,
    }
  );

  private readonly data = rxResource({
    request: () => ({ name: this.productName(), pageIndex: this.pageIndex(), pageSize: this.pageSize() }),
    defaultValue: { data: [], count: 0 },
    loader: ({ request }) => {
      const { name, pageIndex, pageSize } = request;
      return this.ProductService.getList(name, pageIndex, pageSize);
    },
  });

  readonly totalCount = computed(() => {
    const { count } = this.data.value();
    return count;
  });

  readonly products = computed(() => {
    const { data } = this.data.value();
    return data;
  });

  readonly pageIndex = signal(1);

  readonly pageSize = signal(5);

  onBack(): void {
    this.router.navigate(['products']);
  }

  //加熱購物車
  showAddCartMsg = false;

  private cartService = inject(CartService);

  addToCart() {
    const item = this.product();
    const cartItem = new Cart({
      id: String(item.id),
      name: item.name,
      price: item.price,
      specialPrice: item.specialPrice,
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
