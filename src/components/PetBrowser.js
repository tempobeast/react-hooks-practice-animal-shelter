import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {

  const petsToRender = pets.map((pet) => <Pet onAdoptPet={onAdoptPet} key={pet.id} pet={pet}/>)

  return <div className="ui cards">{petsToRender}</div>;
}

export default PetBrowser;
