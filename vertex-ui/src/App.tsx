import { Button } from "@/components/ui";


function App() {

  return (

    <main className="
      flex
      min-h-screen
      items-center
      justify-center
      gap-3
      flex-wrap
      p-10
      bg-gray-300
    ">

      <Button>
        Primary
      </Button>


      <Button variant="secondary">
        Secondary
      </Button>


      <Button variant="outline">
        Outline
      </Button>


      <Button variant="ghost">
        Ghost
      </Button>


      <Button variant="destructive">
        Delete
      </Button>


      <Button variant="link">
        Link
      </Button>


    </main>

  );
}


export default App;