export default async function ReviewList({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <h1>Review list of product {productId}</h1>;
}
