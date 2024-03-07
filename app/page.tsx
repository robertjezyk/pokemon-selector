import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/pokemon">
        <Avatar className="transition ease-in-out delay-50 w-48 h-48 hover:scale-110 duration-1000">
          <AvatarImage src="/pokemon.png" alt="@shadcn" />
        </Avatar>
      </Link>
    </main>
  );
}
