import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

function CountryDetail({id}) {

    let dispatch = useDispatch();

    let country = useSelector((state) => state.countryDetail);

    useEffect(() => {
        dispatch(getCountryDetail(id));
    }, [dispatch])

    return (
        <div>
            <h3>{country.name}</h3>
            <img src={country.flag} alt='Flag not found' width='250px' height='200px'/>
            <h4>{country.id}</h4>
            <h5>Continente: {country.continent}</h5>
            <h5>Subregión: {country.subregion}</h5>
            <h5>Capital: {country.capital}</h5>
            <h5>Área: {country.area} Km2</h5>
            <h5>Población: {country.population}</h5>
            <h5>Actividades Turísticas: {country.activites. length ? country.activites.map(a => a.name): 'N/A'} </h5>
        </div>
    )
}

