import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "react-router";
import "./app.css";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/general", label: "通用组件" },
  { to: "/data-display", label: "数据展示" },
  { to: "/form", label: "表单组件" },
  { to: "/feedback", label: "反馈组件" },
  { to: "/overlay", label: "浮层组件" },
  { to: "/navigation", label: "导航组件" },
  { to: "/commerce", label: "电商组件" },
  { to: "/utils", label: "工具函数" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>MG Playground</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 h-screen w-56 shrink-0 overflow-y-auto border-r border-border bg-background-secondary p-4">
        <h1 className="mb-6 text-lg font-bold text-brand">MG Playground</h1>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-brand-subtle font-medium text-brand"
                    : "text-foreground-secondary hover:bg-background-tertiary hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
