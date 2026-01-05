interface ProductReviewProps {
  params: Promise<{ reviewId: string; productId: string }>;
}

export default async function ProductReview({ params }: ProductReviewProps) {
  const { reviewId, productId } = await params;
  return (
    <h1>
      Review {reviewId} for product {productId}
    </h1>
  );
}
