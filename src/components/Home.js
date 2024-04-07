import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "./AppContext";
import { Link } from "react-router-dom"
import Card from "./Card";


import './Home.css'
/*
const DUMMY_MOVIES = [
  {
    
    
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"},

{
    title: "Interstellar",
year: 2013,
actor: "Matthew McConaughey",
genre: "Adventure"}
];

*/

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { mainMovies, setMainMovies, watchlist, setWatchlist } = useAppContext()
    const [recordsPerPage] = useState(9)
    const [ searchfield, setSearchfield ] = useState('')
    const [dateFilter, setDateFilter] = useState(0);
    const [ selectedGenre, setSelectedGenre ] = useState("");

    const uniqueMovieIds = useRef(new Set());
    const apiKey = "9a28b04a"

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

    const movieContainerRef = useRef(null)


    /*const fetchMovies = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=action&page=${currentPage}&apikey=${apiKey}&plot=full`)
            const data = await response.json()
            console.log(data);
        
            if (data.Response === 'True' && Array.isArray(data.Search)) {
                 // Filter out duplicates by IMDb ID
                 const uniqueMovies = data.Search.filter(newMovie => !uniqueMovieIds.current.has(newMovie.imdbID));
                
                 // Update the Set with new IMDb IDs
                 uniqueMovies.forEach(newMovie => uniqueMovieIds.current.add(newMovie.imdbID));
 
                 // SetMovies with the combination of existing movies and unique new movies
                 setMovies(prevMovies => [...prevMovies, ...uniqueMovies]);
                }
              
            
         else {
                console.error("Error fetching movies: ", data)
            } 
        }catch (error) {
            console.error("Error fetching data: ", error);
        }

    }*/

    const fetchMovies = async () => {
        try {
          const response = await fetch(`http://www.omdbapi.com/?s=action&page=${currentPage}&apikey=${apiKey}`);
          const data = await response.json();
          if (data.Response === 'True' && Array.isArray(data.Search)) {
            const uniqueMovies = data.Search.filter(newMovie => !uniqueMovieIds.current.has(newMovie.imdbID))

            uniqueMovies.forEach(newMovie => !uniqueMovieIds.current.add(newMovie.imdbID))

            const detailedMovies = await Promise.all(
             uniqueMovies.map(async (newMovie) => {
                const detailsResponse = await fetch(`http://www.omdbapi.com/?i=${newMovie.imdbID}&apikey=${apiKey}`);
                const detailsData = await detailsResponse.json();
                return detailsData;
              })
            );

      
            setMainMovies(prevMovies => [...prevMovies, ...detailedMovies]);
          } else {
            console.error("Error fetching movies: ", data);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      

      //FILTERING

      const handleGenreFilter = (event) => {
        const selectedGenre = event.target.value;
        setSelectedGenre(selectedGenre)
      }

      const onSearchChange = (event) => {
        setCurrentPage(1);
        uniqueMovieIds.current.clear();
        setSearchfield(event.target.value);
      }

      const handleYearFilter = (event) => {
        const dateFilter = event.target.value;
        setDateFilter(dateFilter);
      }

      const applyFilters = () => {

        if(searchfield === "" || dateFilter === 0 || selectedGenre === "") {
            return setMainMovies(mainMovies)
        }

        let filteredMovies = [...mainMovies]
       
        if (searchfield !== "") {
            filteredMovies = filteredMovies.filter(movie => movie.Title.toLowerCase().includes(searchfield.toLowerCase()));
          }
          console.log("Fiultered by search: ",filteredMovies);
      
          if (dateFilter !== 0) {
            filteredMovies = filteredMovies.filter(movie => movie.Year == dateFilter);
          }
          console.log("Filtered by date: ",filteredMovies);
      
          if (selectedGenre !== '') {
            const selectedGenresArray = selectedGenre.split(",").map(genre => genre.trim())

            filteredMovies = filteredMovies.filter(movie => {
                const movieGenresArray = movie.Genre.split(",").map(genre => genre.trim())
                return selectedGenresArray.some(selectedGenre => movieGenresArray.includes(selectedGenre))
            });
          }
      
          setMainMovies(filteredMovies);
          console.log("FilteredMovies",filteredMovies);
      }

      const handleFilterButtonClick = () => {
        applyFilters();
      }
    
      const handleResetButtonClick = () => {
        setSearchfield("");
        setDateFilter(0)
        setSelectedGenre("")

        applyFilters();
      }

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
        console.log(currentPage);
        
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


    useEffect(() => {
        fetchMovies()

    }, [currentPage])

    const isInWatchlist = (imdbID) => {
        return watchlist.some(movie => movie.imdbID === imdbID);
    }

    return (
        <>
        <nav>
            <ul>
                
                <li className="nav-links-text"> <Link to="/" style={linkStyle}> Log Out </Link> </li>
                <li className="nav-links-text"> <Link to="/watchlist" style={linkStyle}> Watchlist </Link>  </li>
                {/*kad napravis usere, postavi path da bude "/:uid/watchlist"*/}
                <li className="nav-links-text"> <Link to="/reviews" style={linkStyle}> My Reviews </Link></li>

                <li className="title-home">mrabyEMIR</li>
            </ul>
        </nav>
    <div id="mainContainer" className="main-container">
        <div className="main">
            <div className="movie-container-with-filter">
                <div ref={movieContainerRef} className="movie-container">
                    <div className="movies">
                        {
                        
                        mainMovies.slice(indexOfFirstRecord, indexOfLastRecord).map((movie) => {
                            
                            return <Card
                             key={movie.imdbID}

                             movie={{
                                  Image:movie.Poster,
                                  Title:movie.Title,
                                  Year:movie.Year,
                                  Actors:movie.Actors,
                                  Genre:movie.Genre
                            }}

                            handleWatchlist={() =>  { 
                                if(isInWatchlist(movie.imdbID)){
                                    alert("Movie is already in watchlist!")
                                }  else {

                                    setWatchlist(prevWatchlist => [...prevWatchlist, movie])
                                }        
                            }} 
                            
                            context="home"

                            />
                        })
                
                    }
                    </div>
                    </div>

                <div className="movie-filter">
                    <label>Search</label>
                    <input onChange={onSearchChange} type="search" style={{color:"black"}}/>
                    <label>Year:</label>
                    <input type="number" style={{color:"black"}} onChange={handleYearFilter}/>


                    <label>Genre</label>
                    <select style={{color:"black"}} onChange={handleGenreFilter}>
                        <option value="">Select Genre</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Western">Western</option>
                        <option value="Musical">Musical</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Action">Action</option>
                        <option value="Horror">Horror</option>
                    </select>

                    <button onClick={handleFilterButtonClick}>FILTER</button>
                    <input type="reset" id="reset" value={"RESET"} style={{color:"black"}} onClick={handleResetButtonClick}/>

                </div>
            </div>
        </div>

            <div className="load-more-container">
                    <button className="load-more" onClick={loadMore}>Next Page</button>
            </div>
                    
        </div>
        </>
    )
}

const linkStyle = {
    textDecoration: "none"
}

export default Home;