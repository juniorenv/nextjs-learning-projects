import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ productId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { productId } = await params;
  return {
    title: `Product ${productId}`,
  };
};

export default async function ProductDetails({ params }: Props) {
  const { productId } = await params;

  if (productId === "reviews") notFound();

  return <h1>Details about product: {productId}</h1>;
}
