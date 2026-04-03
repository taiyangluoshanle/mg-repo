"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@mg/ui";

export const CardBasicDemo = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>卡片标题</CardTitle>
        <CardDescription>这是一段描述文字，介绍卡片的用途。</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">卡片内容区域，可以放置任意内容。</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          取消
        </Button>
        <Button size="sm">确认</Button>
      </CardFooter>
    </Card>
  );
};
