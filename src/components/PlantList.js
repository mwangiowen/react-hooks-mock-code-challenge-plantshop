import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plantData, markSoldOut }) {
  return (
    <ul className="cards">
      {plantData.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          markSoldOut={() => markSoldOut(plant.id)}
        />
      ))}
    </ul>
  );
}

export default PlantList;
