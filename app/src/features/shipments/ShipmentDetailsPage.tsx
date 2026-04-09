import React from "react";
import ShipmentDetailsPanel from "./ShipmentDetailsPanel";
import shipmentDetail from "../../JsonData/ShipmentDetail.json";

const ShipmentDetailsPage = () => {
  return (
    <div className="px-4 pb-8 pt-6 text-white sm:px-6 lg:px-8">
      <ShipmentDetailsPanel shipment={shipmentDetail} />
    </div>
  );
};

export default ShipmentDetailsPage;