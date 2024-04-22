"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  }, []);

  return (
    <main className="flex flex-col w-full h-screen max-h-dvh bg-white">
      <header className="p-4 border-b w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">AI Chat</h1>
      </header>

      <section className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto items-center gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            className="flex-1 min-h-[40px]"
            placeholder="Type your question here..."
            type="text"
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>

      <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <ul ref={chatParent} className="h-1 p-4 flex-grow bg-black/[.05] rounded-lg overflow-y-auto flex flex-col gap-4">
          {messages.map((m, index) => (
            <>
              {m.role === "user" ? (
                <li className="flex flex-row">
                  <div className="rounded-xl p-4 bg-white shadow-md flex">
                    <p className="text-zinc-900">{m.content}</p>
                  </div>
                </li>
              ) : (
                <li className="flex flex-row-reverse">
                  <div className="rounded-xl p-4 bg-zinc-900 shadow-md flex w-3/4">
                    <p className="text-zinc-100">{m.content}</p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </section>
    </main>
  );
}
