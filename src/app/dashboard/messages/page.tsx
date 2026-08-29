"use client";

import { ConversationList } from "@/components/messages/ConversationList";
import { MOCK_CONVERSATIONS, MOCK_CURRENT_USER } from "@/lib/mockData/messages";

export default function MessagesPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Your Conversations</h1>
      </div>
      <ConversationList
        conversations={MOCK_CONVERSATIONS}
        currentUserId={MOCK_CURRENT_USER.uid}
      />
    </div>
  );
}
