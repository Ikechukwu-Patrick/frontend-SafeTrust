"use client";

import { use } from "react";
import { ConversationThread } from "@/components/messages/ConversationThread";
import { MOCK_CONVERSATIONS } from "@/lib/mockData/messages";

export default function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = use(params);
  const conversation = MOCK_CONVERSATIONS.find((item) => item.id === conversationId);

  return (
    <div className="h-full flex flex-col">
      {conversation && (
        <div className="p-4 border-b flex items-center gap-3">
          <div>
            <h2 className="font-semibold">{conversation.apartment.name}</h2>
            <p className="text-sm text-muted-foreground">
              Host: {conversation.host.first_name} {conversation.host.last_name}
            </p>
          </div>
        </div>
      )}
      <ConversationThread
        conversationId={conversationId}
        apartmentId="mock-apartment-1"
      />
    </div>
  );
}
