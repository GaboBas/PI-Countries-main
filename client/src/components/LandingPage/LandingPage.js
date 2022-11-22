import React from "react";
import { NavLink } from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div className={style.body}>
        <h3>Henry Countries</h3>
        <NavLink to={'/home'}>Ingresar</NavLink>
    </div>
  );
}
