import React from "react";
import { CardType } from "./CradsTypes";

const CardsComponent = ({ number, description }: CardType) => {
  return (
    <div className="rounded-md p-2 text-center bg-gray-900">
      <h1 className="font-bold text-3xl">{number}</h1>
      <p className="text-sm font-semibold">{description}</p>
    </div>
  );
};

export default CardsComponent;
