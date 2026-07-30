"use client";

import { use } from "react";
import { EscrowPendingView } from "@/components/escrow/views/EscrowPendingView";

// TODO: replace with Hasura query → public.apartments WHERE id = $id
// and Hasura query → public.trustless_work_escrows WHERE apartment_id = $id
const buildStubEscrow = (id: string) => ({
  id,
  invoiceNumber: `INV${id.replace(/-/g, "").slice(0, 12).toUpperCase()}`,
  status: "pending_signature",
  amount: 2400,
  receiverAddress: "",
  apartment: {
    id,
    name: "Moderno Apartamento en San José Centro",
    address: "Avenida Central, Centro, San José",
    description:
      "Apartamento renovado con acabados de lujo, 2 habitaciones, 2 baños",
    beds: 2,
    baths: 1,
    petFriendly: true,
    imageUrls: [
      "/img/room1.png",
      "/img/room2.png",
      "/img/room3.png",
      "/img/room4.png",
    ],
    owner: {
      name: "Alberto Casas",
      email: "albertoCasas100@gmail.com",
      phone: "+506 64852179",
    },
  },
});

export default function EscrowCreatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const escrow = buildStubEscrow(id);

  return <EscrowPendingView escrow={escrow} />;
}
