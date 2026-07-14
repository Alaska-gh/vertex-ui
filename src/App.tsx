import { VButton } from "@/components/ui";
import { ArrowRight, Plus, Settings, Search } from "lucide-react";

function App() {
  return (
    <main className="flex min-h-screen flex-wrap items-center justify-center gap-3 bg-gray-300 p-10">
      
  <VButton>
    Primary
  </VButton>

  <VButton disabled>
    Disabled
  </VButton>

  <VButton loading>
    Loading
  </VButton>

  <VButton
    size="icon"
    aria-label="Settings"
  >
    <Settings />
  </VButton>

  <VButton fullWidth leftIcon={<Plus/>}>
    Save
  </VButton>

  <VButton asChild>
    <a href="/">Home</a>
  </VButton>
    </main>
  );
}

export default App;
