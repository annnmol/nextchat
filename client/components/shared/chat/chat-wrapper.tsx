"use server";

import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatScreen from "./chat-screen";

interface Props {}

export default async function ChatWrapper({}: Props) {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatHeader />
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <ChatScreen />
    <ChatInput />
    </div>
    </div>
  );
}
