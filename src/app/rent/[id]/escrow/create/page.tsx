"use client";

import { use } from "react";
import { notFound } from "next/navigation";


// TODO: replace with Hasura query → public.apartments WHERE id = $id
// and Hasura query → public.trustless_work_escrows WHERE apartment_id = $id
const STUB_APARTMENTS: Record<string, any> = {
  "1": {
    name: "Moderno Apartamento en San José Centro",
    address: "Avenida Central, Centro, San José",
    deposit: 2400,
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
  },
  "2": {
    name: "Suite Ejecutiva Sabana Norte",
    address: "Calle 42, Sabana Norte, San José",
    deposit: 1900,
    description:
      "Suite ejecutiva completamente amueblada con vista panorámica de la ciudad.",
    beds: 2,
    baths: 1,
    petFriendly: true,
    imageUrls: [
      "/img/room2.png",
      "/img/room1.png",
      "/img/room3.png",
      "/img/room4.png",
    ],
  },
};

const buildStubEscrow = (id: string) => {
  const apt = STUB_APARTMENTS[id] || STUB_APARTMENTS["1"];

  return {
    id,
    invoiceNumber: `INV${id.replace(/-/g, "").slice(0, 12).toUpperCase()}`,
    status: "pending_signature",
    amount: apt.deposit,
    receiverAddress: "",
    apartment: {
      id,
      name: apt.name,
      address: apt.address,
      description: apt.description,
      beds: apt.beds,
      baths: apt.baths,
      petFriendly: apt.petFriendly,
      imageUrls: apt.imageUrls,
      owner: {
        name: "Alberto Casas",
        email: "albertoCasas100@gmail.com",
        phone: "+506 64852179",
      },
    },
  };
};

export default function EscrowCreatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { id } = use(params);
  const escrow = buildStubEscrow(id);

  // Allowlist status model excluding sensitive owner info
  const displayEscrow = {
    ...escrow,
    apartment: {
      ...escrow.apartment,
      owner: {
        name: escrow.apartment.owner.name,
        // email and phone explicitly excluded
      },
    },
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Escrow Creation (Stub)</h2>
      <p className="text-muted-foreground">This view is pending implementation.</p>
      <pre className="text-left bg-muted p-4 mt-4 rounded overflow-auto text-xs">
        {JSON.stringify(displayEscrow, null, 2)}
      </pre>
    </div>
  );
}
