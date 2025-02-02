"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BellDot, ChevronDownIcon, UserCircle } from "lucide-react";
import Search from "./studio/search";
import { signOut } from "next-auth/react";

export function UserNav() {
  return (
    <div className={cn("p-4 w-full h-fit text-gray-300")}>
      <div className="p-2 px-6 bg-[#27272F] rounded-2xl h-full relative flex flex-row  items-center justify-between">
        <h3 className="text-sm font-semibold ">Design Studio</h3>
        <div className="flex flex-row gap-2 items-center">
          <Button size={"sm"}>Support</Button>
          <Button size={"sm"}>Product Tour </Button>
          <Search />
          <Button size={"sm"}>
            <BellDot className="h-4 w-4" />
          </Button>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"sm"}>
                  {" "}
                  <UserCircle className="h-4 w-4 mr-1" /> falahsss900@gmail.com{" "}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" rounded-xl">
                <DropdownMenuItem className="w-full" onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
