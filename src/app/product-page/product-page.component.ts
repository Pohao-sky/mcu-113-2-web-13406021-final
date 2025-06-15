import { ProductService } from './../services/product.service';
import { Component, computed, inject, signal } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  imports: [ReactiveFormsModule, PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private router = inject(Router);
  private productService = inject(ProductService);

  readonly pageIndex = signal(1);
  readonly pageSize = signal(5);

  readonly searchControl = new FormControl<string | undefined>(undefined, { nonNullable: true });
  readonly searchKeyword = signal<string | undefined>(undefined);

  private readonly data = rxResource({
    request: () => ({ name: this.searchKeyword(), pageIndex: this.pageIndex(), pageSize: this.pageSize() }),
    defaultValue: { data: [], count: 0 },
    loader: ({ request }) => {
      const { name, pageIndex, pageSize } = request;
      return this.productService.getList(name, pageIndex, pageSize);
    },
  });

  readonly totalCount = computed(() => this.data.value().count);
  readonly products = computed(() => this.data.value().data);

  onSearch(): void {
    // 只有按下查詢時，才會改變查詢值
    this.searchKeyword.set(this.searchControl.value);
    // 按查詢時也可以回到第一頁
    this.pageIndex.set(1);
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
