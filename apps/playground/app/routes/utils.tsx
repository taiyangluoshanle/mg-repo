import { cn } from "@mg/utils";

export default function UtilsPage() {
  const merged = cn("rounded-md p-4", "bg-brand text-foreground-inverse", "font-semibold");

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">工具函数</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">cn() — 类名合并</h2>
        <div className={merged}>
          cn(&quot;rounded-md p-4&quot;, &quot;bg-brand text-foreground-inverse&quot;, &quot;font-semibold&quot;)
        </div>
        <pre className="rounded-lg border border-border bg-background-secondary p-3 text-sm">
          结果: {merged}
        </pre>
      </section>
    </div>
  );
}
