import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({countries, pagination, currentPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil((countries+1)/10); i++) {  //Sumo 1 al countries porque la primera página tendrá 9 paises
        pageNumbers.push(i)
         }

         return <div>
            <ul>
                <button className={style.arrow} disabled={currentPage===1} onClick={(() => pagination(currentPage-1))}> {'<-'} </button>
                {pageNumbers.length > 1 && pageNumbers.map(n => {
                    if(n===currentPage) return  <button className={style.selectedPageButtons} onClick={() => pagination(n)} key={n}>{n}</button>
                    else return  <button className={style.pageButtons} onClick={() => pagination(n)} key={n}>{n}</button>
                            
                })}
                <button className={style.arrow}disabled={currentPage===(pageNumbers.length)} onClick={(() => pagination(currentPage+1))}> {'->'} </button>
            </ul>
         </div>

}