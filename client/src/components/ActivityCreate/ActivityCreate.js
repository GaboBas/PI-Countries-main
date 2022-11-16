import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCountries, getActivities, orderByName, createActivity } from "../../actions";

export default function ActivityCreate() {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.filteredCountries);
  const seasons = ["Verano", "Otoño", "Invierno", "Primavera"];
  const difficulties = ["1", "2", "3", "4", "5"];

  const [activity, setActivity] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],
  });

  const [addedCountries, setAddedCountries] = useState([]) //Estado que sirve para mostrar los paises agregados a la actividad por el momento ya que activity.countries es un array de ids

  const [error, setError] = useState('');  

  function validateName(name) {
    let validation = /[¡!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/¿?]+/;
    if (validation.test(name)){
      setError('El nombre de la actividad no debe contener caracteres especiales')
    }
  }


  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  dispatch(orderByName("asc")); //Ordeno la lista de paises para que sea más fácil encontrarlos

  function handleChange(e) {
    console.log(e.target.name);

    if([e.target.name] === 'name'){
      validateName(e.target.name);
    }

    setActivity({...activity, [e.target.name] : e.target.value})
  }
console.log(activity);

  function handleSelect(e) {
    console.log(e.target.value)

    if(activity.countries.find(c => c===e.target.value)){
      return alert('Ya agregaste ese país');
    }
    
    setActivity({...activity, countries: [...activity.countries, e.target.value]});

    let addCountry = countries.find(c => c.id==e.target.value);

    setAddedCountries([...addedCountries, addCountry]);
  }

  
  function deleteSelect(e){
    e.preventDefault();

    setActivity({...activity, countries: activity.countries.filter(c => c!==e.target.value)})

    let deleteCountry = countries.find(c => c.id==e.target.value);

    setAddedCountries(addedCountries.filter(c => c.name !== deleteCountry.name));

  }
  
  function handleSubmit(e) {
    dispatch(createActivity(activity));
    alert('¡Actividad Creada!');
    setActivity({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: [],
    })
  }

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear Actividad</h1>
      <form  onSubmit={e=> {handleSubmit(e)}}>
        <div>
          <label>Nombre: </label>
          <input type="text" name="name" value={activity.name} key='name' onChange={(e)=>handleChange(e)} required />
        </div>
        <div>
          <label>Dificultad: </label>
          <div>
            {difficulties.map((d) => {
              return (
                <span>
                  <input
                    type="radio"
                    name="difficulty"
                    value={d}
                    key={d}
                    onChange={(e)=>handleChange(e)}/>
                  <label>{d}</label>
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <label>Estación: </label>
          <div>
            {seasons.map((s) => {
              return (
                <span>
                  <input
                    type="radio"
                    name="season"
                    value={s}
                    key={s}
                    onChange={(e)=>handleChange(e)}/>
                  <label>{s}</label>
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <label>Duración: </label>
          <input
            key='duration'
            type="number"
            name="duration"
            placeholder="Horas..."
            value={activity.duration}
            min={1}
            max={24}
            onChange={(e)=>handleChange(e)}
          /> Hs.
        </div>

        <div>
          <label>País: </label>
          
          <select onChange={(e)=> handleSelect(e)}>
          <option value="" hidden>Seleccione País</option>
            {countries.map((c) => {
              return (
                <option key={c.id} name='countries' value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <div>
            {addedCountries?.map(c => {
                return (
                    <span key={c.id}>{c.name}<button value={c.id} onClick={e=>{deleteSelect(e)}}>X</button></span>
                )
            })}
          </div>
        </div>
        <div>
          <button type="submit">Crear Actividad</button>
        </div>
      </form>
    </div>
  );
}
