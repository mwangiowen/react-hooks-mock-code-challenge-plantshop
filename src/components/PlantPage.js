import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    // Fetch plants when the component mounts
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlantData(data))
      .catch((error) => console.error("Error fetching plant data:", error));
  }, []);

  const addPlant = (newPlant) => {
    // Add a new plant to the list
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => setPlantData([...plantData, data]))
      .catch((error) => console.error("Error adding new plant:", error));
  };

  const markSoldOut = (plantId) => {
    // Mark a plant as sold out
    const updatedPlantData = plantData.map((plant) => {
      if (plant.id === plantId) {
        return { ...plant, soldOut: true };
      }
      return plant;
    });

    setPlantData(updatedPlantData);
  };

  const searchPlants = (query) => {
    // Search for plants based on the name
    // Implement your search logic here
    // For simplicity, I'm filtering plants based on whether the name includes the query
    const filteredPlants = plantData.filter((plant) =>
      plant.name.toLowerCase().includes(query.toLowerCase())
    );

    setPlantData(filteredPlants);
  };

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchPlants={searchPlants} />
      <PlantList plantData={plantData} markSoldOut={markSoldOut} />
    </main>
  );
}

export default PlantPage;
