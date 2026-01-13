import { notFound, redirect } from "next/navigation";

interface ProductReviewProps {
  params: Promise<{ reviewId: string; productId: string }>;
}

function getRandomNumber(counter: number): number {
  return Math.floor(Math.random() * counter);
}

export default async function ProductReview({ params }: ProductReviewProps) {
  const randomNumber = getRandomNumber(2);

  if (randomNumber === 1) {
    throw new Error("Error in review product");
  }

  const { reviewId, productId } = await params;

  if (parseInt(reviewId) > 1000) {
    // notFound();
    redirect("/");
  }

  return (
    <h1>
      Review {reviewId} for product {productId}
    </h1>
  );
}
