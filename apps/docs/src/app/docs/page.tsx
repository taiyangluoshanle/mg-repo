import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export default async function DocsIndexPage() {
  const [{ source }, { DocsLayout }, { baseOptions }, { DocsPage, DocsBody }] =
    await Promise.all([
      import("@/lib/source"),
      import("fumadocs-ui/layouts/docs"),
      import("@/lib/layout.shared"),
      import("fumadocs-ui/page"),
    ]);

  const { customMdxComponents } = await import("@/lib/mdx-components");

  const page = source.getPage([]);
  if (!page) notFound();

  const MDX = page.data.body;
  const toc = Array.isArray(page.data.toc) ? page.data.toc : [];

  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      <DocsPage toc={toc}>
        <DocsBody>
          <h1>{page.data.title}</h1>
          <MDX components={customMdxComponents} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const { source } = await import("@/lib/source");
  const page = source.getPage([]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
