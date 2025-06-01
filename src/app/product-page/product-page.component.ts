import { ProductService } from './../services/product.service';
import { Component, computed, inject } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private router = inject(Router);

  private productService = inject(ProductService);

  private readonly pageIndex$ = new BehaviorSubject(1);
  get pageIndex(): number {
    return this.pageIndex$.value;
  }
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }

  pageSize = 5;

  private readonly data$ = this.pageIndex$.pipe(
    tap((value) => console.log('page index', value)),
    switchMap(() => this.productService.getList(undefined, this.pageIndex, this.pageSize))
  );

  private readonly data = toSignal(this.data$, { initialValue: { data: [], count: 0 } });

  readonly totalCount = computed(() => {
    const { count } = this.data();
    return count;
  });

  readonly products = computed(() => {
    const { data } = this.data();
    return data;
  });

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
