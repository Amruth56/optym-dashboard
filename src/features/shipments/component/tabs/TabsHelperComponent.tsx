import ShipmentDetailsPanel from "../../ShipmentDetailsPanel";
import shipmentDetail from "../../../../JsonData/ShipmentDetail.json";

export const TabsData = [
  {
    name: "SHIPMENT DETAILS",
    value: "SHIPMENT_DETAILS",
    content: <ShipmentDetailsPanel shipment={shipmentDetail} />,
  },
  {
    name: "PHOTOS",
    value: "PHOTOS",
    content: (
      <div className="rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm text-white/80">
        Photos content goes here.
      </div>
    ),
  },
  {
    name: "ACTIVITY",
    value: "ACTIVITY",
    content: (
      <div className="rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm text-white/80">
        Activity content goes here.
      </div>
    ),
  },
];
