import React from "react";

export default function Country({name, flag, continent, population, activities}) {
  return (
    <div>
      <img src={flag} alt='Flag not found' width='250px' height='200px'/>
      <h3>{name}</h3>
      <h5>{continent}</h5>
      <h5>Población: {population}</h5>
      <h5>{activities}</h5>
    </div>
  );
}
