import { ShipmentTableRow, InfoRowTypes } from "./ShipmentsTypes";

export const InfoRow = ({
  label,
  value,
}: InfoRowTypes) => (
  <div className="flex justify-between gap-4 text-sm text-slate-300">
    <span className="text-slate-400">{label}</span>
    <span className="font-medium text-white">{value || "--"}</span>
  </div>
);

export const shipmentTableRows: ShipmentTableRow[] = [
  {
    pc: 1,
    hm: "",
    pkg: "PT",
    description: "BUSHINGS",
    class: 70,
    weight: 174,
    rate: "",
  },
  {
    description: "FUEL SURCHARGE",
    class: "FS",
    weight: "",
    rate: "",
  },
  {
    description: "SINGLE SHIPMENT CHARGE",
    class: "SS",
    weight: "",
    rate: "",
  },
];

export const ShipmentCardData = [
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
