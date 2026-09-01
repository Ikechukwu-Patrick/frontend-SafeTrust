export const MOCK_CURRENT_USER = {
  uid: "mock-guest-1",
  first_name: "Guest",
  last_name: "User",
};

export const MOCK_CONVERSATIONS = [
  {
    id: "conv-1",
    last_message_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    apartment: { name: "Downtown Loft Apartment" },
    host: {
      id: "mock-host-1",
      first_name: "John",
      last_name: "D.",
    },
    guest: {
      id: "mock-guest-1",
      first_name: "Guest",
      last_name: "User",
    },
    messages: [
      {
        body: "Hi John, is this loft available?",
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        sender: { first_name: "Guest" },
      },
    ],
  },
  {
    id: "conv-2",
    last_message_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    apartment: { name: "Seaside Condo" },
    host: {
      id: "mock-host-2",
      first_name: "Alice",
      last_name: "P.",
    },
    guest: {
      id: "mock-guest-1",
      first_name: "Guest",
      last_name: "User",
    },
    messages: [
      {
        body: "Is parking included?",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        sender: { first_name: "Guest" },
      },
    ],
  },
  {
    id: "conv-3",
    last_message_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    apartment: { name: "Cozy Cabin" },
    host: {
      id: "mock-host-3",
      first_name: "Bob",
      last_name: "S.",
    },
    guest: {
      id: "mock-guest-1",
      first_name: "Guest",
      last_name: "User",
    },
    messages: [
      {
        body: "What is the check-in time?",
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        sender: { first_name: "Guest" },
      },
    ],
  },
];

export type MockMessage = {
  id: string;
  body: string;
  is_automated: boolean;
  event_type: string | null;
  read_at: string | null;
  created_at: string;
  sender: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export const MOCK_MESSAGES: Record<string, MockMessage[]> = {
  "conv-1": [
    {
      id: "msg-1",
      body: "Hi John, is this loft available?",
      is_automated: false,
      event_type: null,
      read_at: null,
      created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      sender: {
        id: "mock-guest-1",
        first_name: "Guest",
        last_name: "User",
        email: "guest@test.com",
      },
    },
    {
      id: "msg-2",
      body: "Hi, yes the loft is available. After booking you will use SafeTrust escrow for payment.",
      is_automated: false,
      event_type: null,
      read_at: new Date().toISOString(),
      created_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      sender: {
        id: "mock-host-1",
        first_name: "John",
        last_name: "D.",
        email: "john@host.com",
      },
    },
    {
      id: "msg-3",
      body: "BOOKING CONFIRMED\nUnique Escrow ID: {uuid1}",
      is_automated: true,
      event_type: "escrow_funded",
      read_at: null,
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      sender: {
        id: "system",
        first_name: "SafeTrust",
        last_name: "System",
        email: "system@safetrust.com",
      },
    },
    {
      id: "msg-4",
      body: "ESCROW FUNDED\nTenant deposit confirmed on Stellar. Unique Escrow ID: {uuid1}",
      is_automated: true,
      event_type: "escrow_funded",
      read_at: null,
      created_at: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
      sender: {
        id: "system",
        first_name: "SafeTrust",
        last_name: "System",
        email: "system@safetrust.com",
      },
    },
    {
      id: "msg-5",
      body: "Hi John, is this loft available?",
      is_automated: false,
      event_type: null,
      read_at: null,
      created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      sender: {
        id: "mock-guest-1",
        first_name: "Guest",
        last_name: "User",
        email: "guest@test.com",
      },
    },
  ],
  "conv-2": [
    {
      id: "msg-6",
      body: "Is parking included?",
      is_automated: false,
      event_type: null,
      read_at: null,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sender: {
        id: "mock-guest-1",
        first_name: "Guest",
        last_name: "User",
        email: "guest@test.com",
      },
    },
  ],
  "conv-3": [
    {
      id: "msg-7",
      body: "What is the check-in time?",
      is_automated: false,
      event_type: null,
      read_at: null,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      sender: {
        id: "mock-guest-1",
        first_name: "Guest",
        last_name: "User",
        email: "guest@test.com",
      },
    },
  ],
};
