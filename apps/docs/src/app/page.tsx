import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          MG Design System
        </h1>
        <p className="text-lg text-fd-muted-foreground mb-8">
          构建一致、高效、美观的用户界面。公司级前端基础设施文档。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow hover:bg-fd-primary/90 transition-colors"
          >
            快速开始
          </Link>
          <Link
            href="/docs/components/general/button"
            className="inline-flex items-center justify-center rounded-lg border border-fd-border px-6 py-3 text-sm font-medium hover:bg-fd-accent transition-colors"
          >
            浏览组件
          </Link>
        </div>
      </div>
    </main>
  );
}
