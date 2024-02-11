"use server";

import { GITHUB_URL } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import { Github } from "lucide-react";

interface Props {}

export default async function Header({}: Props) {
  return (
    <>
     <Link href="#" className="text-4xl font-bold text-gradient">
          Next Chat
        </Link>
        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-10 w-10"
          )}
        >
          <Github className="w-7 h-7 text-muted-foreground" />
        </Link>
    </>
  );
}
