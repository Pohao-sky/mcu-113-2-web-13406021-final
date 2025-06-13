export class Cart {
  constructor(init?: Partial<Cart>) {
    Object.assign(this, init);
  }

  id!: string;

  name!: string;

  price!: number;

  specialPrice?: number;

  qty!: number;
}
