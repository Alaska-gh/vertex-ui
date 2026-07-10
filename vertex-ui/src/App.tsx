import { useTheme } from "@/hooks/use-theme";

function App() {
  const {
    theme,
    resolvedTheme,
    setTheme,
  } = useTheme();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 rounded-lg border p-8">
        <h1 className="text-3xl font-bold">
          Vertex UI
        </h1>

        <p>Theme: {theme}</p>

        <p>Resolved: {resolvedTheme}</p>

        <div className="flex gap-2">
          <button
            onClick={() => setTheme("light")}
          >
            Light
          </button>

          <button
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>

          <button
            onClick={() => setTheme("system")}
          >
            System
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;