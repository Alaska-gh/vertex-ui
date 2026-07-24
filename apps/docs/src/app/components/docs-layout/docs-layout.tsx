import { Sidebar } from "../sidebar/Sidebar";
import { TableOfContents } from "../toc/Toc";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({
  children,
}: DocsLayoutProps) {
  return (
    <div className="mx-auto flex max-w-7xl">
      <Sidebar />

      <main className="min-w-0 flex-1 px-8 py-10">
        {children}
      </main>

      <TableOfContents />
    </div>
  );
}