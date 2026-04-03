"use client";

import { useState } from "react";
import { Pagination } from "@mg/ui";

export const PaginationBasicDemo = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
  );
};
