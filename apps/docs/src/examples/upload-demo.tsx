"use client";

import { Upload } from "@mg/ui";

export const UploadBasicDemo = () => {
  return (
    <Upload
      className="w-full max-w-sm"
      label="点击或拖拽上传文件"
      accept="image/*"
    />
  );
};
