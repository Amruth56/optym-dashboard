import React from "react";
import { ShipmentDetail, ShipmentDetailsPanelProps, ShipmentTableRow } from "./ShipmentsTypes";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <div className="flex justify-between gap-4 text-sm mb-1">
    <span className="text-slate-400">{label}</span>
    <span className="font-bold text-white">{value || "--"}</span>
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
    {children}
  </span>
);

export default function ShipmentDetailsPanel({
  shipment,
}: ShipmentDetailsPanelProps) {
  const currentStep = shipment.lifeCycleSteps?.[0];
  const firstAssignee =
    currentStep?.assignedTo?.[0]?.assignedToName || "Unassigned";

  return (
    <div className="">
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
              <InfoRow label="Shipper Address" value={`${shipment?.shipper?.address || " "}, ${shipment?.shipper?.city}, ${shipment?.shipper?.state} ${shipment?.shipper?.zip}`} />
              <InfoRow
                label="Order #"
                value={shipment.deliverySchedule?.dueDate || "--"}
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
                value={` ${shipment?.consignee?.address}, ${shipment?.consignee?.city}, ${shipment?.consignee?.state} ${shipment?.consignee?.zip}` || "--"}
              />
              <InfoRow
                label="Customer #"
                value={shipment?.consignee?.number || "--"}
              />
            </div>
          </div>

          <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <InfoRow label="Assigned to" value={firstAssignee} />
            <InfoRow label="Task" value={currentStep?.action || "--"} />
            <InfoRow label="Assignment" value={currentStep?.info || "--"} />
            <InfoRow
              label="Load/door"
              value={`${shipment.originTerminal} → ${shipment.destinationTerminal}`}
            />
          </div>
        </section>
      </div>

      
    </div>
  );
}
