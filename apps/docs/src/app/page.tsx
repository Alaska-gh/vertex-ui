import { DocsLayout } from "./components/docs-layout/docs-layout";
import { Header } from "./components/header/Header";

export default function Home() {
  return (
   <>
    <Header/>
    <DocsLayout>

      <h1 className="text-4xl font-bold">
        Vertex UI
      </h1>

      <p className="mt-4 text-muted-foreground">
        A modern React component library.
      </p>

    </DocsLayout>
   </>
  );
}