"use client";

import { BannerCarousel } from "@mg/ui-commerce";

export const BannerCarouselBasicDemo = () => {
  return (
    <BannerCarousel
      items={[
        { image: "https://picsum.photos/seed/banner1/800/300", alt: "春季促销" },
        { image: "https://picsum.photos/seed/banner2/800/300", alt: "新品上市", href: "#" },
        { image: "https://picsum.photos/seed/banner3/800/300", alt: "限时折扣" },
      ]}
      autoPlay
      interval={4000}
    />
  );
};
