import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFilterChange(filterName) {
    setFilters({type: filterName})
  }

  function handleFindPets(e) {
      if (filters.type === "all") {
        return fetch(`http://localhost:3001/pets/`)
        .then((res) => res.json())
        .then((data) => setPets(data))
      } else {
        return fetch(`http://localhost:3001/pets?type=${filters.type}`)
        .then((res) => res.json())
        .then((data) => setPets(data))
      }
    }

    function resetPets(petObj) {
      const updatedPets = pets.map((pet) => {
        if (pet.id === petObj.id) {
          return petObj
        } else {
          return pet
        }
      })
      setPets(updatedPets)
    }

    function onAdoptPet(petId) {
        fetch(`http://localhost:3001/pets/${petId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "isAdopted": true,
          })
        })
        .then((res) => res.json())
        .then((data) => resetPets(data))
      }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
            onChangeType={handleFilterChange} 
            onFindPetsClick={handleFindPets}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
