export default function Home() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">MG Playground</h1>
      <p className="mt-3 text-foreground-secondary">
        这是一个基于 React Router v7（SSR）的消费者测试项目，用于验证 MG
        Design System 公共包在真实业务场景中的可用性。
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <InfoCard title="@mg/ui" description="基于 Base UI 的通用组件库" />
        <InfoCard title="@mg/ui-commerce" description="电商业务组件库" />
        <InfoCard title="@mg/utils" description="公共工具函数库" />
        <InfoCard title="@mg/tailwind-config" description="共享 TailwindCSS 主题与 Design Token" />
      </div>

      <div className="mt-8 rounded-lg border border-border bg-background-secondary p-4 text-sm">
        <h2 className="font-semibold">SSR 验证</h2>
        <p className="mt-1 text-foreground-secondary">
          本页面通过 React Router v7 Framework Mode 进行服务端渲染。
          查看页面源代码可确认 HTML 已在服务端生成。
        </p>
      </div>
    </div>
  );
}

const InfoCard = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-lg border border-border p-4">
    <h3 className="font-mono text-sm font-semibold text-brand">{title}</h3>
    <p className="mt-1 text-sm text-foreground-secondary">{description}</p>
  </div>
);
