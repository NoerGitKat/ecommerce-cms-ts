import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
  return (
    <main className="p-4">
      <p>This is a protected route.</p>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
