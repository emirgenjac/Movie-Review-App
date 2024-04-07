import React, { useState } from "react";
import { useAppContext } from "./AppContext";
import Watchlist from "./Watchlist";

import './Card.css'



const Card = ({movie, handleWatchlist, context}) => {
    const { Title, Year, Actors, Genre, Image } = movie;
    const { setWatchlist } = useAppContext();

   
    
    
    return(
        <div className="card">
            <div className="card-image">
                <img src={Image} alt={Title}/>
            </div>

            <div className="card-info">
                <h2 className="movie-title">{Title}</h2>
                <p className="movie-year">Year: {Year}</p>
                <p className="movie-genre">Genre: {Genre}</p>
                <p className="movie-actor">Actor: {Actors}</p>
            </div>




            <div className="movie-buttons">
                <button><span className="material-symbols-outlined">star</span></button>
                {context === "home" ? (

                    <button onClick={handleWatchlist}>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                ) : (
                    <button onClick={handleWatchlist}><span className="material-symbols-outlined">remove</span></button>
                )}
            </div>
        </div>

)
}


export default Card;