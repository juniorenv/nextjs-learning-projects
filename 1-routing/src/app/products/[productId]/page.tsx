import { notFound, redirect } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  if (productId === "reviews") notFound();

  return <h1>Details about product: {productId}</h1>;
}
