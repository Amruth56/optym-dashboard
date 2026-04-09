"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../reusable/components/Navbar";
import CardsComponent from "../../reusable/components/cards/CardsComponent";
import TabsUnderlineDemo from "./component/tabs/TabsComponent";
import TableComponent from "./component/table/TableComponent";

const ShipmentCardData = [
  {
    number: "5.3",
    description: "Overall Bills /Hr",
  },
  {
    number: "9023",
    description: "Load Average: Loading and Closed",
  },
  { number: "25412", description: "Closed Load Average" },
  {
    number: "37",
    description: " # Dockers Working",
  },
  {
    number: "5",
    description: "Dockers Unassigned",
  },
];

const shipmentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedProNumber = useMemo(() => {
    if (!searchParams) return null;
    const proParam = searchParams.get("pro");
    if (proParam) return proParam;

    const keys = Array.from(searchParams.keys());
    if (keys.length === 1) return keys[0];
    return null;
  }, [searchParams]);

  const handleProSelect = useCallback(
    (proNumber: string) => {
      if (!proNumber) return;
      if (selectedProNumber === proNumber) {
        router.push("/shipments");
      } else {
        router.push(`/shipments?pro=${encodeURIComponent(proNumber)}`);
      }
    },
    [router, selectedProNumber]
  );

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-5 gap-4 m-4">
        {ShipmentCardData.map((card, index) => (
          <CardsComponent
            key={index}
            number={card.number}
            description={card.description}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <TableComponent onProSelected={handleProSelect} />
        {selectedProNumber ? (
          <TabsUnderlineDemo selectedProNumber={selectedProNumber} />
        ) : null}
      </div>
    </div>
  );
};

export default shipmentsPage;
