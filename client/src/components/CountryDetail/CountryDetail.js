import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountryDetail } from "../../actions";
import loadingLogo from "../../img/world_flags_globe_2.gif";
import style from "./CountryDetail.module.css";

export default function CountryDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
  }, [dispatch]);

  let country = useSelector((state) => state.countryDetail);
  let loading = useSelector((state) => state.loading);

  console.log(country);

  return (
    <div>
      {loading ? (
        <div>
          <img src={loadingLogo} alt="Cargando..." />
          <div>Cargando...</div>
        </div>
      ) : country ? (
        <div>
          <div className={style.title}>
            <h1 className={style.h1}>{country.name}</h1>
          </div>
          <div className={style.body}>
            <div className={style.card}>
              <img
                className={style.flag}
                src={country.flag}
                alt="Flag not found"
              />
              <h4>{country.id}</h4>
              <div className={style.info}>
                <h4>Continente: {country.continent}</h4>
                <h4>Subregión: {country.subregion}</h4>
                <h4>Capital: {country.capital}</h4>
                <h4>Área: {country.area} Km2</h4>
                <h4>Población: {country.population}</h4>
                <h4>
                  Actividades Turísticas:{" "}
                  {country.activities.length ? (
                    <ul className={style.activities}>
                      {country.activities.map((a, i) => (
                        <li>
                          {a.name}:
                          <ul>
                            <li>Dificultad: {a.difficulty}</li>
                            {a.duration && <li>Duración: {a.duration} Horas</li>}
                            <li>Estación: {a.season}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </h4>
              </div>
              <Link to={"/home"}>
                <button>{"<-"} Volver</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>No se encontró el país</div>
      )}
    </div>
  );
}
