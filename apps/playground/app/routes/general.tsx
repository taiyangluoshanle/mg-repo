import { Button, Dialog } from "@mg/ui";
import { useState } from "react";

export default function GeneralPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">通用组件</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Button</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setOpen(true)}>默认按钮</Button>
          <Button variant="outline">描边按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="destructive">危险按钮</Button>
          <Button size="sm">小号</Button>
          <Button size="lg">大号</Button>
          <Button disabled>禁用</Button>
        </div>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        123123
      </Dialog>
    </div>
  );
}
