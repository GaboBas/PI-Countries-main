import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, searchCountry } from "../../actions";

export default function SearchBar(){
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchCountry(name));
        setName('');
    }

    return (
        <div>
            <input type='text' placeholder="País..." value={name} onChange={(e)=>handleInputChange(e)}/>
            <button onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )

}