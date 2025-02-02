"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  PlaySquare,
  BookOpen,
  ShoppingCart,
  List,
  MessageSquare,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

interface MainNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function MainNav({ className, ...props }: MainNavProps) {
  const navigation: {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    active?: boolean;
  }[] = [
    { name: "Revenue", icon: BarChart },
    { name: "Shoppable Video", icon: PlaySquare },
    { name: "Story", icon: BookOpen },
    { name: "Live Commerce", icon: ShoppingCart },
    { name: "Playlist Manager", icon: List, active: true }, //mocked active
    { name: "One Click Post", icon: MessageSquare },
    { name: "Calendar", icon: Calendar },
    { name: "Hire Influencer", icon: Users },
  ];

  const [expanded, seExpanded] = useState(true);

  return (
    <div
      className={cn(
        "p-4 h-screen max-w-[20%] text-gray-300 transition-all",
        className,
        !expanded && "w-fit"
      )}
      {...props}
    >
      <div className="p-4 bg-[#27272F] rounded-2xl h-full relative px-6">
        <Button
          onClick={() => seExpanded(!expanded)}
          className="h-fit w-fit rounded-full absolute top-5 -right-3 p-1"
        >
          {expanded ? (
            <ChevronLeft className="h-8 w-8 rounded-xl bg-gray-300 text-gray-800" />
          ) : (
            <ChevronRight className="h-8 w-8 rounded-xl bg-gray-300 text-gray-800" />
          )}
        </Button>
        <div className="flex items-center pt-2">
          <img src="../logo.png" alt="Logo" className="min-w-[90px] h-[30px]" />
        </div>
        <div
          className={cn(
            `flex flex-col gap-6 items-start pt-6`,
            !expanded && "w-full items-center"
          )}
        >
          {navigation.map(({ name, icon: Icon, active }) => (
            <Button
              key={name}
              variant="ghost"
              className={cn(
                "rounded-xl w-full text-left flex flex-row hover:bg-gray-600 hover:text-white",
                expanded && "justify-start",
                active &&
                  "bg-gray-700 text-white hover:bg-gray-600 hover:text-white border border-gray-500"
              )}
            >
              <Icon />
              {expanded && (
                <span className="font-semibold text-sm"> {name}</span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
