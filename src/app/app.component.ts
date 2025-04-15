import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  productName = '書籍A';
  author = '作者甲、作者乙、作者丙';
  company = '博碩文化';

  photourl = 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img';

  isShow = true;

  onSetDisplay(isShow: boolean): void {
    this.isShow = isShow;
  }
}
