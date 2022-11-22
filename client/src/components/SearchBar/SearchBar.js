import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../actions";
import style from "./SearchBar.module.css"

export default function SearchBar({setCurrentPage, setFilters}){
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(name === '') return null;
        dispatch(searchCountry(name));
        setName('');
        setFilters(true);
        return setCurrentPage(1);
    }

    return (
        <div>
        <form className={style.searchForm}>
            <input className={style.searchInput} type='search' placeholder="Buscar País..." value={name} onChange={(e)=>handleInputChange(e)}/>
            <button className={style.searchButton} type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </form>
        </div>
    )

}