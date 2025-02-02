import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/authOptions";
import Playlists from "@/components/studio/playlists";

export default async function DesignStudio() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="bg-[#1B1B22] flex flex-row text-gray-300">
      <MainNav />
      <div className="w-full">
        <div className="h-[10%]">
          <UserNav />
        </div>
        <div className="m-4 h-[77%]">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-medium">Product Playlists</h3>
            <div>
              <Button disabled>Generate Code</Button>
            </div>
          </div>
          <div className="mt-4 h-full">
            <Playlists />
          </div>
        </div>
      </div>
    </div>
  );
}
