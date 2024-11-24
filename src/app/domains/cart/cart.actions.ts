import { Product } from "../products/product.interface";

export class AddProduct {
  static readonly type = '[CART] Add Product';
  constructor(public product: Product) {}
}

export class RemoveProduct {
  static readonly type = '[CART] Remove Product';
  constructor(public product: Product) {}
}

export class ComputeCart {
  static readonly type = '[CART] Compute Cart';
}

export class SaveCart {
  static readonly type = '[CART] Save Cart';
}

export class ResetCart {
  static readonly type = '[CART] Reset Cart';
}