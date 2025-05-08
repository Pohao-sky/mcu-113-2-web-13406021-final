import { ProductService } from './../services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  private router = inject(Router);

  ProductService!: ProductService;

  products: Product[] = [];

  ngOnInit(): void {
    this.ProductService = new ProductService();
    this.products = this.ProductService.getList();
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
