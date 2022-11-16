import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../actions";

export default function SearchBar({setCurrentPage}){
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
        return setCurrentPage(1);
    }

    return (
        <div>
            <input type='search' placeholder="País..." value={name} onChange={(e)=>handleInputChange(e)}/>
            <button onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )

}