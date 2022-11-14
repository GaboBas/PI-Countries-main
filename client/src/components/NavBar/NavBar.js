import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <h1>Henry Countries</h1>
            <NavLink to='/home'>Países</NavLink>
            <NavLink to='/home/activities'>Actividades</NavLink>
        </div>
    )
}