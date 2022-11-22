import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar() {
    return (
        <div className={style.body}>
            <h1><NavLink className={style.title} to='/home'>Henry Countries</NavLink></h1>
            <ul className={style.ul}> 
            <li className={style.li}><NavLink className={style.a} activeClassName={style.active} exact to='/home'>Países</NavLink></li>
            <li className={style.li}><NavLink className={style.a} activeClassName={style.active} exact to='/home/activity/create'>Crear Actividad</NavLink></li>
            </ul>
        </div>
    )
}