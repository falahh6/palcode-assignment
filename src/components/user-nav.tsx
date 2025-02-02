"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BellDot,
  ChevronDownIcon,
  Info,
  LogOut,
  MessageCircleWarning,
  UserCircle,
} from "lucide-react";
import Search from "./studio/search";
import { signOut, useSession } from "next-auth/react";

export function UserNav() {
  const session = useSession();

  return (
    <div className={cn("p-4 w-full h-fit text-gray-300")}>
      <div className="p-2 px-6 bg-[#27272F] rounded-2xl h-full relative flex flex-row  items-center justify-between">
        <h3 className="text-sm font-semibold ">Design Studio</h3>
        <div className="flex flex-row gap-2 items-center">
          <Button size={"sm"} variant={"custom"}>
            <MessageCircleWarning className="h-4 w-4 text-blue-500 group-hover:text-white" />{" "}
            Support
          </Button>
          <Button size={"sm"} variant={"custom"}>
            <Info className="h-4 w-4 text-blue-500 group-hover:text-white" />
            Product Tour{" "}
          </Button>
          <Search />
          <Button size={"sm"} variant={"custom"}>
            <BellDot className="h-4 w-4" />
          </Button>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"sm"} className="hover:cursor-pointer">
                  <UserCircle className="h-4 w-4 mr-1" />{" "}
                  {session.data?.user?.email}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl mr-0 w-full">
                <DropdownMenuItem
                  className="w-full hover:cursor-pointer hover:bg-gray-300"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
