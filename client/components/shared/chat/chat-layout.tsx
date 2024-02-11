"use server";

import { Separator } from "@/components/ui/separator";
import Sidebar from "../sidebar/sidebar";
import ChatWrapper from "./chat-wrapper";



interface Props {}

export default async function ChatLayout({}: Props) {
  return (
    <>
      <Sidebar isCollapsed={false} />
      <Separator orientation="vertical" />
      <ChatWrapper />
    </>
  );
}
