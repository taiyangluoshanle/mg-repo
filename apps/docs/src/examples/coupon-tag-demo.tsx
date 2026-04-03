"use client";

import { CouponTag } from "@mg/ui-commerce";

export const CouponTagBasicDemo = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <CouponTag type="discount" value="满200享8折" />
      <CouponTag type="reduction" value="立减¥20" />
      <CouponTag type="freeShipping" value="包邮" />
    </div>
  );
};
