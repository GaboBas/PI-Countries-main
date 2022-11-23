import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div className={style.body}>
        <div className={style.content}>
          <h1 className={style.welcome}>Bienvenido a...</h1>
          <h1 className={style.title}>Henry Countries</h1>
          <div className={style.buttonOutside}>
          <Link className={style.button} to={'/home'}>INGRESAR</Link>
      </div></div>
    </div>
  );
}
