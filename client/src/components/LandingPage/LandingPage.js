import React from "react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
        <h3>Henry Countries</h3>
        <NavLink to={'/home'}>Ingresar</NavLink>
    </div>
  );
}
