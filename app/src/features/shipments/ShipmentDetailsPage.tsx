import React from "react";
import ShipmentDetailsPanel from "./ShipmentDetailsPanel";
import shipmentDetail from "../../JsonData/ShipmentDetail.json";

const ShipmentDetailsPage = () => {
  return (
    <div className="">
      <ShipmentDetailsPanel shipment={shipmentDetail} />
    </div>
  );
};

export default ShipmentDetailsPage;