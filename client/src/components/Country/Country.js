import React from "react";
import style from "./Country.module.css";

export default function Country({
  name,
  flag,
  continent,
  population,
  activities,
}) {
  return (
    <div className={style.country}>
      <div className={style.body}>
        <img src={flag} alt="Flag not found" width="150px" height="100px" />
        <h3 className={style.title}>{name}</h3>
        <h4>{continent}</h4>
        <h4>Población: {population}</h4>
        <h4>{activities}</h4>
      </div>
    </div>
  );
}
