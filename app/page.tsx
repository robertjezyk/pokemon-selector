import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/pokemon">
        <Avatar className="w-48 h-48">
          <AvatarImage src="/pokemon.png" alt="@shadcn" />
        </Avatar>
      </Link>
    </main>
  );
}
