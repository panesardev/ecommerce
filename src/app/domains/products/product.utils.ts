import { shuffleArray } from "@app/shared/utils/shuffle-array";
import { PriceFilter, Product } from "./product.interface";

export function sortProducts(products: Product[]): Product[] {
  return products.sort((a, b) => {
    return new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime();
  });
}

export function applyPriceFilter(products: Product[], priceFilter: PriceFilter): Product[] {
  switch (priceFilter) {
    case "LOW-HIGH": return products.sort((a, b) => a.price - b.price);
    case "HIGH-LOW": return products.sort((a, b) => b.price - a.price);
    case "DEFAULT": return shuffleArray(products);;
  }
}
