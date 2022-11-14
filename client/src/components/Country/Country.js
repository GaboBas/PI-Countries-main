import React from "react";

export default function Country({name, flag, continent, population}) {
  return (
    <div>
      <img src={flag} alt='Flag not found' width='250px' height='200px'/>
      <h3>{name}</h3>
      <h5>{continent}</h5>
      <h5>{population}</h5>
    </div>
  );
}
