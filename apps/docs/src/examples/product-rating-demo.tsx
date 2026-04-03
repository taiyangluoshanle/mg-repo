"use client";

import { ProductRating } from "@mg/ui-commerce";

export const ProductRatingBasicDemo = () => {
  return (
    <div className="flex flex-col gap-3">
      <ProductRating value={4.5} count={2680} />
      <ProductRating value={3.2} count={128} />
      <ProductRating value={5} count={10240} />
    </div>
  );
};
