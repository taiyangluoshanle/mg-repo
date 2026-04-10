import { Button, Dialog } from "@mg/ui";
import { Button as BaseButton } from '@base-ui/react/button'
import { useState } from "react";

export default function GeneralPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">通用组件</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Button</h2>
        <div>
          <BaseButton className="flex items-center justify-center h-10 px-3.5 m-0 outline-0 border border-gray-200 rounded-md bg-gray-50 font-inherit text-base font-medium leading-6 text-gray-900 select-none hover:data-[disabled]:bg-gray-50 hover:bg-gray-100 active:data-[disabled]:bg-gray-50 active:bg-gray-200 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] active:border-t-gray-300 active:data-[disabled]:shadow-none active:data-[disabled]:border-t-gray-200 focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:-outline-offset-1 data-[disabled]:text-gray-500">Bssi Ui Button</BaseButton>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setOpen(true)}>默认按钮</Button>
          <Button variant="default">描边按钮</Button>
          <Button variant="text">文本按钮</Button>
          <Button variant="primary" danger>危险按钮</Button>
          <Button size="small">小号</Button>
          <Button size="large">大号</Button>
          <Button disabled>禁用</Button>
        </div>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        123123
      </Dialog>
    </div>
  );
}
