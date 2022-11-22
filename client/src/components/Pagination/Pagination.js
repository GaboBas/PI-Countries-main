import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({countries, pagination, currentPage}) {
    const pageNumbers = [];

    function buttonStyle() {
        if(currentPage === 1) return style.selectedPageButtons;
        else return style.pageButtons;
    }

    for (let i = 1; i <= Math.ceil((countries+1)/10); i++) {  //Sumo 1 al countries porque la primera página tendrá 9 paises
        pageNumbers.push(i)
         }

         return <div>
            <ul>
                {pageNumbers.length > 1 && pageNumbers.map(n => {
                    if(n===currentPage) return  <button className={style.selectedPageButtons} onClick={() => pagination(n)} key={n}>{n}</button>
                    else return  <button className={style.pageButtons} onClick={() => pagination(n)} key={n}>{n}</button>
                            
                })}
            </ul>
         </div>

}