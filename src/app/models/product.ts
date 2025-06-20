export class Product {
  constructor(initDate?: Partial<Product>) {
    if (!initDate) return;
    Object.assign(this, initDate);
  }

  id!: string;

  name!: string;

  company!: string;

  authors!: string[];

  price!: number;

  isShow!: boolean;

  photoUrl!: string;

  createDate!: Date;

  specialPrice?: number;
}
