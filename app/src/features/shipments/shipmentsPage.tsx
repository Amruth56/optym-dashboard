"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CardsComponent from "../../reusable/components/cards/CardsComponent";
import TabsUnderlineDemo from "./component/tabs/TabsComponent";
import TableComponent from "./component/table/TableComponent";
import { ShipmentCardData } from "./ShipmentHelperComponent";


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
