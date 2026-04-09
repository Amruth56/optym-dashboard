import React from "react";
import { ShipmentDetail, ShipmentDetailsPanelProps } from "./ShipmentsTypes";

const InfoRow = ({ label, value }: { label: string; value: string | number | null }) => (
  <div className="flex justify-between gap-4 text-sm text-slate-300">
    <span className="text-slate-400">{label}</span>
    <span className="font-medium text-white">{value || "--"}</span>
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
    {children}
  </span>
);

export default function ShipmentDetailsPanel({ shipment }: ShipmentDetailsPanelProps) {
    const currentStep = shipment.lifeCycleSteps?.[0];
  const firstAssignee = currentStep?.assignedTo?.[0]?.assignedToName || "Unassigned";

  return (
    <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-[#08101b] p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pickup date</p>
              <p className="mt-3 text-2xl font-semibold text-white">{shipment.pickupDate}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Due date</p>
              <p className="mt-3 text-2xl font-semibold text-white">{shipment.deliverySchedule.dueDate}</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <InfoRow label="Current terminal" value={shipment.currentTerminal} />
            <InfoRow label="Next terminal" value={shipment.nextTerminal || "--"} />
            <InfoRow label="Location" value={shipment.location} />
            {/* <InfoRow label="Route" value={route} /> */}
          </div>

          <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <InfoRow label="Assigned to" value={firstAssignee} />
            <InfoRow label="Task" value={currentStep?.action || "--"} />
            <InfoRow label="Assignment" value={currentStep?.info || "--"} />
            <InfoRow label="Load/door" value={`${shipment.originTerminal} → ${shipment.destinationTerminal}`} />
          </div>
        </section>

        <section className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <InfoRow label="Pieces" value={shipment.pieces} />
            <InfoRow label="Weight" value={`${shipment.totalWeight} lbs`} />
            <InfoRow label="Cube" value={`${shipment.cubicFeet} ft³`} />
            <InfoRow label="HU" value={shipment.totalHu} />
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Terminals</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <InfoRow label="Origin" value={shipment.originTerminal} />
              <InfoRow label="Destination" value={shipment.destinationTerminal} />
              <InfoRow label="Stop sequence" value={shipment.stopSequence} />
              <InfoRow label="Loading zone" value={shipment.recommendedLoadingZone || "--"} />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.7fr_0.3fr]">
        <section className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-[24px] bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Shipper</p>
              <p className="text-lg font-semibold text-white">{shipment.shipper.name}</p>
              <p className="text-sm text-slate-300">{shipment.shipper.address}</p>
              <p className="text-sm text-slate-300">{`${shipment.shipper.city}, ${shipment.shipper.state} ${shipment.shipper.zip}`}</p>
            </div>
            <div className="space-y-3 rounded-[24px] bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Consignee</p>
              <p className="text-lg font-semibold text-white">{shipment.consignee.name}</p>
              <p className="text-sm text-slate-300">{shipment.consignee.address || "--"}</p>
              <p className="text-sm text-slate-300">{`${shipment.consignee.city}, ${shipment.consignee.state} ${shipment.consignee.zip}`}</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <InfoRow label="PO" value={shipment.purchaseOrder || "--"} />
            <InfoRow label="BOL" value={shipment.bolNumber || "--"} />
            <InfoRow label="Terms" value={shipment.terms || "--"} />
            <InfoRow label="Status" value={shipment.clientShipmentStatus.displayName} />
          </div>
        </section>

        <section className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Activity</h2>
            <ol className="mt-4 space-y-3">
              {shipment.activities.map((item, idx) => (
                <li key={idx} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                    <p className="font-semibold text-white">{item.label}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.timeLabel || ""}</span>
                  </div>
                  {item.metaLabel ? <p className="mt-2 text-sm text-slate-400">{item.metaLabel}</p> : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#06101c]/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Life cycle</h2>
            <ol className="mt-4 space-y-3">
              {shipment.lifeCycleSteps.map((step, idx) => (
                <li key={idx} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                    <span className="font-semibold text-white">{step.action}</span>
                    <Tag>{step.state}</Tag>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{step.info}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                    {step.origin.displayName} → {step.destination.displayName}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
