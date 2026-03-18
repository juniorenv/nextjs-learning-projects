import { getProducts } from "@/prisma-pg";
import { ProductDetail } from "./product-detail";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string | null;
}

export default async function ProductsDBPage() {
  const products: Product[] = await getProducts();

  return <ProductDetail products={products} />;
}
