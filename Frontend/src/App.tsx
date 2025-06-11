import { Button } from "@/Components/shadcn/button";

export default function App() {
  return (
    <div className="p-2">
      <h2>Notreon Project on development!.</h2>
      <p>Steps left for development:</p>
      <ul>
        <li>1. logo</li>
        <li>2. backend</li>
      </ul>
      <Button variant="outline" onClick={() => alert("NO!")}>Notify when ready</Button>
    </div>
  );
}

