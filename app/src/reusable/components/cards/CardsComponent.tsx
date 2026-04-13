import React from "react";
import { CardType } from "./CradsTypes";

const CardsComponent = ({ number, description }: CardType) => {
  return (
    <div className="rounded-md p-2 text-center bg-black text-white">
      <h1 className="font-bold text-3xl">{number}</h1>
      <p className="text-sm font-semibold">{description}</p>
    </div>
  );
};

export default CardsComponent;


