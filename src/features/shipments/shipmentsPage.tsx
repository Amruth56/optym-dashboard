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
    [router, selectedProNumber],
  );

  return (
    <div className="bg-slate-950/18">
      <div className="grid grid-cols-5 gap-4 p-2">
        {ShipmentCardData.map((card, index) => (
          <CardsComponent
            key={index}
            number={card.number}
            description={card.description}
          />
        ))}
      </div>
      <div className="flex ">
        <TableComponent onProSelected={handleProSelect} />
        {selectedProNumber ? (
          <TabsUnderlineDemo selectedProNumber={selectedProNumber} />
        ) : null}
      </div>
    </div>
  );
};

export default shipmentsPage;
