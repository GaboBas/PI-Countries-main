import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Lin, useHistory } from "react-router-dom";
import { getActivities } from "../../actions";

export default function ActivityCreate() {
    const dispatch = useDispatch(); 

    const countries = useSelector((state) => state.countries);

    const [activity, setActivity] = useState({
        name,
        difficulty,
        duration,
        season,
        countries: []
    })
    
    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch]);

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crear Actividad</h1>
            <form>
                <div>
                    <label>Nombre: </label>
                    <input type='text' value={input.name}></input>
                </div>
                <div>
                    <label>Dificultad</label>
                    
                </div>
            </form>
        </div>

    )
}