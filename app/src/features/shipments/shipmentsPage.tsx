import React from "react";
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
        <TableComponent/>
       <TabsUnderlineDemo/>
       </div>
    </div>
  );
};

export default shipmentsPage;
