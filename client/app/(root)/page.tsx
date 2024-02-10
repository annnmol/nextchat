"use client";
import useListenMessages from "@/components/hooks/useListenMessages";
import { SonnerDemo } from "@/components/shared/sooner-demo";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/socket-context";
import { SOCKET_CONNECTION_TYPES } from "@/lib/enum";
import useStore from "@/zustand";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  //hooks
  const { emitSocketEvent } = useSocket();
  const messages = useStore(useShallow((state) => state.messages));
  useListenMessages();

  //input
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    // Access the current property of the inputRef to get the input element
    const inputValue = inputRef.current?.value ?? "";

    if (!inputValue.trim()) return;

    let data = {
      id: nanoid(),
      session_id: "1",
      type: "text",
      value: inputValue,
      mediaUrl: "aa",
      senderId: "123",
      seen: false,
    };
    emitSocketEvent(SOCKET_CONNECTION_TYPES.AGENT_CHAT, data);

    // Set the input value to an empty string to clear it
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSendMessage();
  };
  return (
    <section className="maxWidthWrapper">
      <SonnerDemo />
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input name="input-box" ref={inputRef} />
              <Button variant={"outline"} type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
        <div>
          {messages.map((e, index) => {
            // console.log(`🚀 ~ file: page.tsx:43 ~ {messages.map ~ e:`, e);
            return <li key={e?.id}>{e?.value}</li>;
          })}
        </div>
      </div>
    </section>
  );
}
