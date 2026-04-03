"use client";

import { Alert } from "@mg/ui";

export const AlertVariantsDemo = () => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert variant="info" title="提示">
        这是一条提示信息。
      </Alert>
      <Alert variant="success" title="成功">
        操作已成功完成。
      </Alert>
      <Alert variant="warning" title="警告">
        请注意此操作可能产生影响。
      </Alert>
      <Alert variant="error" title="错误">
        操作失败，请稍后重试。
      </Alert>
    </div>
  );
};
