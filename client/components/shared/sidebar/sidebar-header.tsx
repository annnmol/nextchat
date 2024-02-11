"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, SquarePen } from "lucide-react";
import Link from "next/link";

interface Props {
  chatsCount: number;
}

export default function SidebarHeader({ chatsCount = 0 }: Props) {
  return (
    <>
      <div className="flex gap-2 items-center text-2xl">
        <p className="font-medium">Chats</p>
        {chatsCount > 0 && (
          <span className="text-zinc-300">({chatsCount})</span>
        )}
      </div>

      <div>
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <MoreHorizontal size={20} />
        </Link>

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <SquarePen size={20} />
        </Link>
      </div>
    </>
  );
}
