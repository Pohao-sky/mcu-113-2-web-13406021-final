export class Cart {
  constructor(init?: Partial<Cart>) {
    Object.assign(this, init);
  }

  id!: number;

  name!: string;

  price!: number;

  specialPrice?: number;

  qty!: number;
}
