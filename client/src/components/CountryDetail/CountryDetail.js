import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountryDetail } from "../../actions";
import loadingLogo from "../../img/world_flags_globe_2.gif";

export default function CountryDetail(props) {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountryDetail(props.match.params.id))
    }, [dispatch]);

    let country = useSelector(state => state.countryDetail);
    let loading = useSelector(state => state.loading);

    console.log(country);

    return (
        <div>
            {loading ? (<div>
        <img src={loadingLogo} alt="Cargando..." /><div>Cargando...</div>
        </div>
      ) :
            country ?
             <div><h3>{country.name}</h3>
            <img src={country.flag} alt='Flag not found' width='250px' height='200px'/>
            <h4>{country.id}</h4>
            <h5>Continente: {country.continent}</h5>
            <h5>Subregión: {country.subregion}</h5>
            <h5>Capital: {country.capital}</h5>
            <h5>Área: {country.area} Km2</h5>
            <h5>Población: {country.population}</h5>
            <h5>Actividades Turísticas: {country.activities.length ? <ul>{country.activities.map(a => 
            <li> {a.name}: <ul>
                <li>Dificultad: {a.difficulty}</li>
                <li>Duración: {a.duration}</li>
                <li>Estación: {a.season}</li>
                </ul></li>)}</ul> : 'N/A'} </h5></div>
                : <div>No se encontró el país</div>
            }

            <Link to={'/home'}>Volver</Link>
        </div>
    )
}

