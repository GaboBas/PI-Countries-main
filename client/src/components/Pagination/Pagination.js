import React from "react";

export default function Pagination({countries, pagination}) {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil((countries+1)/10); i++) {  //Sumo 1 al countries porque la primera página tendrá 9 paises
        pageNumbers.push(i)
         }

         return <div>
            <ul>
                {pageNumbers.length && pageNumbers.map(n => {
                    return  <button onClick={() => pagination(n)} key={n}>{n}</button>
                            
                })}
            </ul>
         </div>

}