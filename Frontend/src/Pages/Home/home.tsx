import { Button } from "@/Components/shadcn/button";
import { useAuthStore } from "@/Store/useAuthstore";

export default function Home() {
  const { checkAuth } = useAuthStore();
  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={checkAuth}>Check Auth</Button>
    </div>
  );
}
