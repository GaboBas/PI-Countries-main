import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivities,
  getCountries,
  filterByContinent,
  orderByName,
  orderByPopulation,
  filterByActivity,
} from "../../actions";
import { Link } from "react-router-dom";
import loadingLogo from "../../img/world_flags_globe_2.gif";
import Country from "../Country/Country";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  let countries = useSelector((state) => state.filteredCountries);
  let activities = useSelector((state) => state.activities);
  let loading = useSelector((state) => state.loading);

  const [filters, setFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const firstIndex = (currentPage - 1) * 10 - 1; // Página actual - 1(porque al descontar un país en la primera página arrancaría en la anterior) por cantidad de países -1 Obtengo el index del primer pais que va a mostarse en la página a partir de la segunda
  const lastIndex = currentPage * 10 - 2; //Obtengo el index del último pais que va a mostrarse en la página a partir de la segunda

  //Estados de filtros y ordenamientos 

  const [orderName, setOrderName] = useState("Nombre");
  const [orderPop, setOrderPop] = useState("Población");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState("All");

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  //ORDENES

  //Ordenar por Nombre
  function handleOrderByName(e) {
    e.preventDefault();
    if (orderName === "Nombre" || orderName === "Nombre ↓") {
      dispatch(orderByName("asc"));
      setOrderName("Nombre ↑");
    } else {
      dispatch(orderByName("desc"));
      setOrderName("Nombre ↓");
    }
    setFilters(true);
    setOrderPop("Población"); //Para asegurarse que el botón población ya no cuente con ninguna flechita
  }

  //Ordenar por población
  function handleOrderByPopulation(e) {
    e.preventDefault();
    if (orderPop === "Población" || orderPop === "Población ↓") {
      dispatch(orderByPopulation("min"));
      setOrderPop("Población ↑");
    } else {
      dispatch(dispatch(orderByPopulation("max")));
      setOrderPop("Población ↓");
    }
    setFilters(true);
    setOrderName("Nombre"); //Para asegurarse que el botón Nombre ya no cuente con ninguna flechita
  }

  //FILTROS

  //Filtrar por Continente
  function handleFilterContinent(e) {
    e.preventDefault();
    setSelectedContinent(e.target.value);
    setSelectedActivity("All");
    dispatch(filterByContinent(e.target.value));
    if (e.target.value === "All") {
      setFilters(false);
    } else {
      setFilters(true);
    }
    setCurrentPage(1);
  }

  //Filtrar por actividad
  function handleFilterActivity(e) {
    e.preventDefault();
    setSelectedActivity(e.target.value);
    setSelectedContinent("All");
    dispatch(filterByActivity(e.target.value));
    if (e.target.value === "All") {
      setFilters(false);
    } else {
      setFilters(true);
    }
    setCurrentPage(1);
  }

  //Quitar filtros

  function handleUnfilter(e) {
    e.preventDefault();
    dispatch(getCountries());
    setFilters(false);
    setSelectedActivity("All");
    setSelectedContinent("All");
    setOrderName("Nombre");
    setOrderPop("Población");
    setCurrentPage(1);
  }

  return (
    <div>
      <div className={style.searchBar}>
        <div className={style.filters}>
          <div className={style.orderButtons}>
            <div>Ordenar por:</div>

            <button onClick={(e) => handleOrderByName(e)}>{orderName}</button>

            <button onClick={(e) => handleOrderByPopulation(e)}>
              {orderPop}
            </button>
          </div>
          <div className={style.filterButtons}>
            <div className={style.orderSelectFilters}>
              <div>Filtrar todos por Continente: </div>
              <select
                id="Continents"
                value={selectedContinent}
                onChange={(e) => handleFilterContinent(e)}
              >
                <option value="All">Todos</option>
                <option value="Africa">África</option>
                <option value="Antarctica">Antártica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="North America">Norteamérica</option>
                <option value="South America">Sudamérica</option>
                <option value="Oceania">Oceanía</option>
              </select>
            </div>
            <div className={style.orderSelectFilters}>
              <div>Filtrar todos por Actividad: </div>
              <select
                id="Activities"
                value={selectedActivity}
                onChange={(e) => handleFilterActivity(e)}
              >
                <option value="All">Todas</option>
                {activities?.map((a) => {
                  return (
                    <option value={a.name} key={a.id}>
                      {a.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <SearchBar setCurrentPage={setCurrentPage} setFilters={setFilters} />
        </div>

        <button
          disabled={!filters}
          className={style.unfilter}
          onClick={(e) => handleUnfilter(e)}
        >
          Quitar Filtros/Búsqueda
        </button>
      </div>
      <div className={style.pagination}>
        <Pagination
          countries={countries.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
      {loading ? 
        <div>
          <img src={loadingLogo} alt="Cargando..." />
          <div>Cargando...</div>
        </div>
       : countries.length ? 
        <div className={style.cards}>
          {countries.map((c, i) => {
            if (i < 9 && currentPage === 1)
              return (
                <div className={style.countries}>
                  <Link key={i} to={"/home/" + c.id}>
                    <Country
                      name={c.name}
                      flag={c.flag}
                      continent={c.continent}
                      population={c.population}
                      key={c.id}
                    />
                  </Link>
                </div>
              );
            //Si es la primera página, voy a renderizar los primeros 9 paises, teniendo en cuenta el index del arreglo countries
            else if (i >= firstIndex && i <= lastIndex && currentPage !== 1)
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  key={i}
                  to={"/home/" + c.id}
                >
                  <Country
                    name={c.name}
                    flag={c.flag}
                    continent={c.continent}
                    population={c.population}
                    key={c.id}
                  />
                </Link>
              ); //A partir de la segunda, renderizaré 10 paises
          })}{" "}
        </div>
       : (
        <h2>No se encontraron países </h2>
      )}
      
    </div>
  );
}

/*   <select onChange={(e)=> handleOrderByName(e)}>
  <option value="desc">Descendente</option>
  <option value="asc">Ascendente</option>
</select> */

/*     dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`); */

/*   <select onChange={(e) => handleOrderByPopulation(e)}>
        
  <option value="max">Máx</option>
  <option value="min">Mín</option>
</select> */

/* dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrderPop(`Ordered ${e.target.value}`); */
