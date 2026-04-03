"use client";

import { ProductGallery } from "@mg/ui-commerce";

export const ProductGalleryBasicDemo = () => {
  return (
    <div className="max-w-md">
      <ProductGallery
        images={[
          "https://picsum.photos/seed/gallery1/600/600",
          "https://picsum.photos/seed/gallery2/600/600",
          "https://picsum.photos/seed/gallery3/600/600",
        ]}
        alt="商品图片"
      />
    </div>
  );
};
