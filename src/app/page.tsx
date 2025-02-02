"use client";

import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  console.log("session", session);

  if (session?.user) redirect("/studio");

  return (
    <div className="flex flex-row items-center gap-4 justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Link href={"/studio"}>
        <Button>
          Go to Design Studio <Component />
        </Button>
      </Link> */}
      <Button onClick={() => signIn("google")}>Google Sign In </Button>
    </div>
  );
}
