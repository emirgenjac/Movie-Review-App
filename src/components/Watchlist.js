import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";
import Card from "./Card";

import './Watchlist.css'

const movies = {
    movie1 : {
        id:1212131,
        Title:"Interstellar",
        Year:1999,
        Actors:"MCCC",
        Genre:"Adventure",
        Image:"../ASSETS/Interstellar.jpg"
    },

    movie2 : {
        id:12121,
        Title:"Inter",
        Year:1999,
        Actors:"MCCC",
        Genre:"Adventure",
        Image:"../ASSETS/Interstellar.jpg"
    }

}


const Watchlist = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(9)
    const [ searchfield, setSearchfield ] = useState('')
    const [dateFilter, setDateFilter] = useState(0);
    const [ selectedGenre, setSelectedGenre ] = useState("");

    const uniqueMovieIds = useRef(new Set());
    const apiKey = "9a28b04a"

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

    const movieContainerRef = useRef(null)

    const { watchlist , setWatchlist } = useAppContext()

    const removeFromWatchlist = (imdbID) => {
        const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID)
        setWatchlist(updatedWatchlist)
    }
    
    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1)
        if (movieContainerRef.current) {
            const containerTop = movieContainerRef.current.offsetTop;

            if(window.innerWidth <= 600) {
                document.getElementById("mainContainer").scrollIntoView({
                    behavior:"smooth",
                });
            } else {

                movieContainerRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    }

    return (
        <>
        <nav>
            <ul>
                <li> <Link to="/" style={linkStyle}> Log Out </Link> </li>
                <li> <Link to="/reviews" style={linkStyle}>My Reviews</Link>  </li>
                { /*kad napravis usere, postavi path da bude "/:uid/watchlist"*/ }
                <li> <Link to="/home" style={linkStyle}> Home </Link></li>
            </ul>
        </nav>
    <div className="main-container">
        <div className="main">
            <div className="movie-container-with-filter">
                <div className="movie-container">
                    <div className="movies">
                    {watchlist && watchlist.length > 0 ? (

                        watchlist.slice(indexOfFirstRecord, indexOfLastRecord).map((movie) => (
                             <Card
                             key={movie.imdbID}
                             movie={{
                                  
                                Image:movie.Poster,
                                Title:movie.Title,
                                Year:movie.Year,
                                Actors:movie.Actors,
                                Genre:movie.Genre
                                  
                          }}
                             handleWatchlist={() => removeFromWatchlist(movie.imdbID)}
                             context="watchlist"
                             
                                  />
                        ))
                    ) : (
                        <div className="empty-watchlist-container">
                        <p className="empty-watchlist">No movies in the watchlist</p>
                        </div>
                    )
                        
                    }
                    </div>
                    
                </div>

                <div className="movie-filter">
                    <label>Search</label>
                    <input type="search" style={{color:"black"}}/>
                    <label>From:</label>
                    <input type="date"/>
                    <label>To:</label>
                    <input type="date"/>


                    <label>Genre</label>
                    <select>
                        <option>Adventure</option>
                        <option>Western</option>
                        <option>Musical</option>
                        <option>Thriller</option>
                        <option>Sci-Fi</option>
                        <option>Action</option>
                        <option>Horror</option>
                    </select>

                    <button>FILTER</button>
                    <input type="reset" id="reset" value={"RESET"}/>

                </div>
            </div>
        </div>

        <div className="load-more-container">
                    <button className="load-more" onClick={handleLoadMore}>Next Page</button>
            </div>
           
        </div>
        </>
    )
}

const linkStyle = {
    textDecoration: "none"
}

    


export default Watchlist