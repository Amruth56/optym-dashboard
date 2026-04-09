import React from "react";
import { ShipmentDetailsPanelProps } from "./ShipmentsTypes";
import { shipmentTableRows, InfoRow } from "./ShipmentHelperComponent";

export default function ShipmentDetailsPanel({
  shipment,
}: ShipmentDetailsPanelProps) {

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <InfoRow
                label="Pickup Date"
                value={shipment.pickupDate || "--"}
              />
              <InfoRow label="Pro Number" value={shipment.proNumber || "--"} />
              <InfoRow
                label="Due Date"
                value={shipment.deliverySchedule?.dueDate || "--"}
              />
            </div>
            <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
              <InfoRow
                label="Current terminal"
                value={shipment?.currentTerminal}
              />
              <InfoRow
                label="Next terminal"
                value={shipment?.nextTerminal || "--"}
              />
              <InfoRow
                label="Shipment Status"
                value={shipment?.clientShipmentStatus?.displayName || "--"}
              />
              <InfoRow label="Location" value={shipment?.location} />
            </div>
          </div>
          </section>

{/* shipper and consignee section */}
        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <InfoRow
                label="Shipper"
                value={shipment.shipper.name || "--"}
              />
              <InfoRow
                label="Shipper Address"
                value={`${shipment?.shipper?.address || ""}, ${shipment?.shipper?.city}, ${shipment?.shipper?.state} ${shipment?.shipper?.zip}`}
              />
              <InfoRow
                label="Order #"
                value={shipment.purchaseOrder || "--"}
              />
              <InfoRow
                label="Shipper #"
                value={shipment.shipper.number || "--"}
              />
            </div>
            <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
              <InfoRow
                label="Consignee"
                value={shipment?.consignee?.name || "--"}
              />
              <InfoRow
                label="Consignee Address"
                value={`${shipment?.consignee?.address || ""}, ${shipment?.consignee?.city}, ${shipment?.consignee?.state} ${shipment?.consignee?.zip}`}
              />
              <InfoRow
                label="Customer #"
                value={shipment?.consignee?.number || "--"}
              />
            </div>
          </div>
        </section>
      </div>

      
{/* shipment table */}
      <section className="rounded-md border border-white/10 bg-[#06101c]/80 p-5">
        <div className="overflow-x-auto  no-scrollbar">
          <table className="min-w-full border-collapse text-sm text-slate-300">
            <thead>
              <tr className="border-b border-white/10   text-left text-xs uppercase tracking-[0.24em] font-bold">
                <th className="px-4 py-3 w-12">PC</th>
                <th className="px-4 py-3 w-14">HM</th>
                <th className="px-4 py-3 w-14">PKG</th>
                <th className="px-4 py-3">DESCRIPTION</th>
                <th className="px-4 py-3 w-20">CLASS</th>
                <th className="px-4 py-3 w-24">WEIGHT</th>
                <th className="px-4 py-3 w-24">RATE</th>
              </tr>
            </thead>
            <tbody>
              {shipmentTableRows.map((row, index) => (
                <tr
                  key={index}
                >
                  <td className="border-b border-white/10 px-4 py-3 font-semibold text-white">
                    {row.pc ?? ""}
                  </td>
                  <td className="border-b border-white/10 px-4 py-3">{row.hm || ""}</td>
                  <td className="border-b border-white/10 px-4 py-3">{row.pkg || ""}</td>
                  <td className="border-b border-white/10 px-4 py-3">{row.description || ""}</td>
                  <td className="border-b border-white/10 px-4 py-3">{row.class ?? ""}</td>
                  <td className="border-b border-white/10 px-4 py-3">{row.weight ?? ""}</td>
                  <td className="border-b border-white/10 px-4 py-3">{row.rate ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-2">
        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <InfoRow
                label="Original Terminal"
                value={shipment.originTerminal || "--"}
              />
              <InfoRow label="Destination Terminal" value={shipment.destinationTerminal || "--"} />
              <InfoRow
                label="Trailer"
                value={shipment?.trailerNumber || "--"}
              />
              <InfoRow
                label="BOL #"
                value={shipment?.bolNumber || "--"}
              />
              <InfoRow
                label="Terms"
                value={shipment?.terms || "--"}
              />
            </div>
            <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
              <InfoRow
                label="LH Load To and Type/Door"
                value={`${shipment?.lhLoadTo || "--"} / ${shipment?.lhLoadType || "--"}`}
              />
              <InfoRow
                label="Route/Door"
                value={shipment?.nextTerminal || "--"}
              />
              <InfoRow
                label="Stop Seq"
                value={shipment?.stopSequence || "--"}
              />
              <InfoRow
                label="Loading Zone"
                value={shipment?.recommendedLoadingZone || "--"}
              />
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
}
