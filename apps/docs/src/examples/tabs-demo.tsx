"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@mg/ui";

export const TabsBasicDemo = () => {
  return (
    <Tabs defaultValue="preview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="preview">预览</TabsTrigger>
        <TabsTrigger value="code">代码</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <p className="p-4 text-sm">这是预览内容。</p>
      </TabsContent>
      <TabsContent value="code">
        <p className="p-4 text-sm">这是代码内容。</p>
      </TabsContent>
      <TabsContent value="api">
        <p className="p-4 text-sm">这是 API 文档。</p>
      </TabsContent>
    </Tabs>
  );
};
