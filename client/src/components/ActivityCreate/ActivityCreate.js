import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCountries, getActivities, orderByName, createActivity } from "../../actions";
import style from "./ActivityCreate.module.css";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const countries = useSelector((state) => state.filteredCountries);
  const activities =useSelector((state) => state.activities)
  const seasons = ["Verano", "Otoño", "Invierno", "Primavera"];
  const difficulties = ["1", "2", "3", "4", "5"];

  const [activity, setActivity] = useState({
    name: '',
    difficulty: '1',
    duration: null,
    season: 'Verano',
    countries: [],
  });


  const [addedCountries, setAddedCountries] = useState([]) //Estado que sirve para mostrar los paises agregados a la actividad por el momento ya que activity.countries es un array de ids

  const [errors, setErrors] = useState({});  
 
  //Validaciones
  function validate(activity) {
    let errors = {};
    let validation = /[¡!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/¿?]+/;

    if(activities.find(a => a.name===activity.name)){
      errors.name = '*Ya existe una actividad con ese nombre';
    } else if(!activity.name) {
      errors.name = '*La actividad debe tener un nombre';
    }else if(validation.test(activity.name)){
      errors.name = '*El nombre de la actividad no debe contener caracteres especiales'
    }
    
    if (activity.duration < 0 || activity.duration > 24 ){
      errors.duration = '*La duración debe ser entre 0 y 24 horas';
    }

    if (!activity.season){
      errors.season = '*Debes selecionar una estación';
    }

    if (!activity.difficulty){
      errors.difficulty = '*Debes selecionar una dificultad';
    }


    if(!activity.countries.length) {errors.countries = '*Debes agregar al menos un país'
    }

    return errors;
  }


  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  
  dispatch(orderByName("asc")); //Ordeno la lista de paises para que sea más fácil encontrarlos

  function handleChange(e) {

    setActivity({...activity, [e.target.name] : e.target.value})
    
      /*   setErrors(validate({
      ...activity, [e.target.name] : e.target.value
    })) */

  }


  function handleSelect(e) {
    
    let country = e.target.value;
    
    e.target.value = 'Seleccione País';


    if(activity.countries.find(c => c===country)){
      return alert('Ya agregaste ese país');
    }


  
    setActivity({...activity, countries: [...activity.countries, country]});

    let addCountry = countries.find(c => c.id===country);


    setAddedCountries([...addedCountries, addCountry]);

    

  }

console.log(activity)
  
  function deleteSelect(e){
    e.preventDefault();

    setActivity({...activity, countries: activity.countries.filter(c => c!==e.target.value)})

    let deleteCountry = countries.find(c => c.id===e.target.value);

    setAddedCountries(addedCountries.filter(c => c.name !== deleteCountry.name));

  }
  
  function handleSubmit(e) {
    e.preventDefault();

    setErrors(validate(activity));

    if(Object.keys(validate(activity)).length) return null;


    dispatch(createActivity(activity));
    alert('¡Actividad Creada!');
    setActivity({
      name: '',
      difficulty: '1',
      duration: null,
      season: 'Verano',
      countries: [],
    })
    history.push('/home');
  }

  return (
    <div className={style.body}>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear Actividad</h1>
      <form className={style.form}  onSubmit={e=> {handleSubmit(e)}}>
        <div className={style.input}>
          <label>Nombre: </label>
          <input type="text" name="name" value={activity.name} key='name' onChange={(e)=>handleChange(e)} autoComplete="off"  />
          {errors.name && ( <p className={style.error}>{errors.name}</p>)}
        </div>
        <div className={style.input}>
          <label>Dificultad: </label>
          <div>
            {difficulties.map((d, i) => {
              return (
                <span key={i}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={d}
                    key={d}
                    on
                    onChange={(e)=>handleChange(e)}
                    defaultChecked={i === 0}
                    required/>
                  <label>{d}</label>
                </span>
              );
            })}
          </div>
        </div>
        <div className={style.input}>
          <label>Estación: </label>
          <div>
            {seasons.map((s, i) => {
              return (
                <span key={i}>
                  <input
                    type="radio"
                    name="season"
                    value={s}
                    key={s}
                    onChange={(e)=>handleChange(e)}
                    defaultChecked={i === 0}
                    required/>
                  <label>{s}</label>
                </span>
              );
            })}
            {errors.season && (<p className={style.error}>{errors.season}</p>)}
          </div>
        </div>

        <div className={style.input}>
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
          {errors.duration && (<p className={style.error}>{errors.duration}</p>)}
        </div>

        <div className={style.input}>
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
                    <span key={c.id}>{c.name}<button type="button" value={c.id} onClick={e=>{deleteSelect(e)}}>X</button></span>
                )
            })}
            {errors.countries && ( <p className={style.error}>{errors.countries}</p>)}
          </div>
        </div>
        <div>
          <button type="submit" onClick={e => validate(activity)} className={style.submitButton} >Crear Actividad</button>
        </div>
      </form>
    </div>
  );
}
