# 🌟 SafeTrust 🌟

**SafeTrust** is a decentralized P2P escrow platform targeting the hospitality and tourism sector. Powered by the Stellar blockchain via the TrustlessWork API, it replaces traditional deposit systems for hotels, vacation rentals, and booking platforms with trustless smart contracts that hold funds on-chain, release payments automatically on checkout confirmation, and handle disputes through transparent on-chain arbitration giving both guests and hosts a secure, verifiable alternative to legacy payment intermediaries. 🌐✨

---
## 🚀 **Why Choose SafeTrust?**

🔐 **Trustless Technology**: Secure and block deposits without intermediaries.
💾 **Blockchain-Powered Transparency**: Immutable, auditable, and verifiable transactions.
💱 **Crypto-Payment Support**: Manage cryptocurrency payments safely and efficiently.
✅ **Automated Refunds**: Streamlined processes ensure refunds and payment releases happen automatically.

---

## 🌟 **Key Features**

🛠️ **Trustless Escrow**: Funds are securely held in blockchain-based escrow accounts until all terms are met.

🔎 **Blockchain Transparency**: Every transaction is logged on the blockchain for full visibility and accountability. 📜

💰 **Crypto Payments**: Supports irreversible and secure cryptocurrency payments while reducing risks of fraud or disputes.

🔗 **Trustline Process**: Verified trustlines between parties add an extra layer of transaction security. 🔒

📤 **Automated Refund System**: Ensures funds are automatically released based on the terms of the agreement, with no manual intervention required.

---

## ⚙️ **How It Works**

1. **Create Escrow**: The renter creates a secure escrow account. 🏗️
2. **Fund Escrow**: The deposit is funded by the renter. 💵
3. **Rental Agreement**: Terms are agreed upon and stored on the blockchain. 📃
4. **Completion or Cancellation**: Funds are released based on contract outcomes. 🎯

---

## 📋 **Getting Started**

### **Prerequisites**

- Node.js v18 or later 🖥️
- A Stellar blockchain wallet — **Freighter** is recommended 🔐
- Trustless Work API access ([docs here](https://docs.trustlesswork.com/trustless-work)) 📖
- A Firebase project with **Email/Password** authentication enabled ([Firebase Console](https://console.firebase.google.com)) 🔥

> 🧩 **This repo runs standalone.** `frontend-SafeTrust` does **not** require `backend-SafeTrust` to be running locally. It connects directly to a live Hasura GraphQL endpoint and to Firebase — both are remote services reachable over the network, not local processes you need to start. See [Architecture: Standalone vs. Monorepo](#-architecture-standalone-vs-monorepo) below for the full explanation.

---

### **Installation**

**1️⃣ Fork and clone the repository**

```bash
git clone https://github.com/<your_user>/frontend-SafeTrust
cd frontend-SafeTrust
git remote add upstream https://github.com/safetrustcr/frontend-SafeTrust
```

**2️⃣ Install dependencies**

```bash
npm install
```

**3️⃣ Set up environment variables**

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in each value — follow the **Environment Variables** section below step by step. Do not commit `.env.local`; it is already covered by `.gitignore`.

**4️⃣ Start the development server**

```bash
npm run dev
```

This repo runs on **port 3000 by default**. You only need to override the port with `npm run dev -- --port 3001` if you are *also* running `landing-SafeTrust` locally at the same time — see [Port Conventions](#-port-conventions) below.

---

### **Environment Variables**

Every environment variable lives in `.env.local` (never committed to git). Use `.env.example` as the template — copy it first, then fill in each block below one at a time.

#### 🔥 1. Firebase Client SDK

These six values come from **Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration → Config**, and are required for Login, Register, and session auth to work:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=<your apiKey>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-project-id>.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-project-id>.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your messagingSenderId>
NEXT_PUBLIC_FIREBASE_APP_ID=<your appId>
```

> ℹ️ These are public, browser-safe values — Firebase ships them to the client by design, and the `NEXT_PUBLIC_` prefix is what makes Next.js expose them to the bundle. The real security boundary is **Firebase Security Rules**, not secrecy of these values. They are **not** the Firebase Admin SDK private key, which belongs only in `backend-SafeTrust` and must never appear here.

Make sure **Email/Password** sign-in is enabled in **Authentication → Sign-in method** for Register and Login to work. 📚 [Firebase Auth docs](https://firebase.google.com/docs/auth)

---

#### 🌐 2. TrustlessWork API (Optional, don't need it yet)

```bash
NEXT_PUBLIC_API_URL=https://api.trustlesswork.com
NEXT_PUBLIC_API_KEY=<your_trustlesswork_api_key>
NEXT_PUBLIC_TRUSTLESS_API_URL=https://api.trustlesswork.com
NEXT_PUBLIC_TRUSTLESS_API_URL_DEV=https://dev.api.trustlesswork.com
NEXT_PUBLIC_TRUSTLESS_NETWORK=testnet
```

- Obtain `NEXT_PUBLIC_API_KEY` from your [TrustlessWork dashboard](https://docs.trustlesswork.com/trustless-work)
- Always use `testnet` for `NEXT_PUBLIC_TRUSTLESS_NETWORK` in local development — never point local dev at `mainnet`

---

#### 🗄️ 3. Hasura GraphQL

```bash
NEXT_PUBLIC_HASURA_GRAPHQL_URL=<your Hasura GraphQL endpoint>/v1/graphql
```

This points to a **Hasura GraphQL endpoint** — typically the shared SafeTrust Hasura instance, reachable over the network. You do **not** need to clone, run, or Dockerize `backend-SafeTrust` to develop on this repo; just point this variable at a working Hasura URL and the frontend talks to it directly.

> 🔒 **`HASURA_GRAPHQL_ADMIN_SECRET` must never be set in this repository.** The frontend authenticates against Hasura via a **Firebase JWT**, not the admin secret. The admin secret grants unrestricted read/write access to the entire database and belongs **only** in `backend-SafeTrust`'s server-side environment — never in a `NEXT_PUBLIC_*` variable, never in `.env.local` here, and never committed anywhere. See `src/config/apollo.ts` for how the JWT-based auth header is attached to GraphQL requests.
>
> If you ever see `NEXT_PUBLIC_HASURA_ADMIN_SECRET` or similar in a `.env` file in this repo, treat it as a security incident — remove it and rotate the secret in `backend-SafeTrust` immediately.

---

### **Complete `.env.local` example**

```bash
# Firebase Client SDK (public, browser-safe — see section 1 above)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# TrustlessWork API  (Optional, don't need it yet)
NEXT_PUBLIC_API_URL=https://api.trustlesswork.com
NEXT_PUBLIC_API_KEY=your_trustlesswork_api_key
NEXT_PUBLIC_TRUSTLESS_API_URL=https://api.trustlesswork.com
NEXT_PUBLIC_TRUSTLESS_API_URL_DEV=https://dev.api.trustlesswork.com
NEXT_PUBLIC_TRUSTLESS_NETWORK=testnet

# Hasura GraphQL (a reachable endpoint — backend-SafeTrust does NOT need to run locally; NO admin secret here, ever)
NEXT_PUBLIC_HASURA_GRAPHQL_URL=https://your-hasura-instance.example.com/v1/graphql
```

---

### **🧩 Architecture: Standalone vs. Monorepo**

SafeTrust ships as three separate repositories, but they can be run in two different ways depending on what you're working on:

| Setup | What runs | When to use it |
|---|---|---|
| **`frontend-SafeTrust` standalone** (this repo) | Only `npm run dev` here. Connects to a remote/shared Hasura GraphQL endpoint and Firebase. No local backend, no Docker. | UI work, component development, dashboard features — most contributor tasks |
| **`dApp-SafeTrust` monorepo** | Both frontend **and** backend (Hasura, Postgres, webhook service) run together via the monorepo's own tooling | Full-stack work that touches schema, mutations, or webhook behavior |
| **`backend-SafeTrust` standalone** | Only the backend (Hasura + Postgres + webhook via Docker Compose), run independently | Backend-only contributors who don't need the UI |

**For this repo (`frontend-SafeTrust`), you only need:**

1. The six Firebase env vars (section 1 above)
2. The TrustlessWork API vars (section 2 above)
3. A working `NEXT_PUBLIC_HASURA_GRAPHQL_URL` pointing at a reachable Hasura instance (section 3 above)
4. `npm run dev`

You do **not** need to clone or run `backend-SafeTrust` to work on this repo. If you want a fully local, isolated backend instead of the shared instance, you can still clone `backend-SafeTrust` separately and point `NEXT_PUBLIC_HASURA_GRAPHQL_URL` at `http://localhost:8080/v1/graphql` — but that's optional, not a requirement to get this repo running.

---

### **🔢 Port Conventions**

This only matters if you're running **multiple SafeTrust repos at the same time** on the same machine (for example, `frontend-SafeTrust` alongside `landing-SafeTrust`). If you're only running this repo, `npm run dev` on its default port (`3000`) is all you need.

| Repo | Port | Start command |
|---|---|---|
| `landing-SafeTrust` | `3000` | `npm run dev` |
| `frontend-SafeTrust` (this repo) | `3000` (default) — use `3001` only if `landing-SafeTrust` is also running | `npm run dev` or `npm run dev -- --port 3001` |
| `backend-SafeTrust` (optional, local backend) | `4000` (webhook), `8080` (Hasura) | `docker compose up -d` |

If you start this repo on the default port while `landing-SafeTrust` is already running on `3000`, your browser may silently load the landing page instead of the dApp — and any runtime errors you see will actually belong to the landing repo, not this one.

---

## 🛠️ **Tech Stack**

- **Frontend**: TypeScript, Next.js 15, Tailwind CSS
- **Auth**: Firebase Authentication (Email/Password, Google OAuth)
- **GraphQL**: Apollo Client 4, Hasura GraphQL Engine
- **Blockchain**: Stellar, TrustlessWork API
- **Wallet**: Freighter, Albedo, LOBSTR

---

## 🧪 **Testing Infrastructure**

This project uses Jest, React Testing Library, and Cypress for comprehensive testing.

### **Running Tests**

```bash
npm test              # unit and integration tests
npm run test:e2e      # E2E tests (Cypress)
npm run test:coverage # coverage report
```

### **Test Structure**

- Unit and integration tests live in `__tests__` directories or as `.test.ts(x)` files next to the code they test
- E2E tests live in `cypress/e2e/`
- API requests are mocked via Mock Service Worker (MSW) — handlers in `mocks/handlers.ts`

---

## 🎨 **Design Mockup**

[SafeTrust Figma](https://www.figma.com/design/CVg9hoim0f1FIlozIar7ZZ/SafeTrust?node-id=0-1&node-type=canvas&t=LCzPmGeJfVxCMWTT-0)

## 📜 License

© 2026 SafeTrust. Released under the [MIT License](https://opensource.org/license/MIT).

---
