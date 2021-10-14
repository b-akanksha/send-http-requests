import React from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchMoviesHandler = React.useCallback(async function () {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("url");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedData = [];

      for(const key in data) {
        loadedData.push({
          id: key,
          title:data[key].title,
          releaseDate:data[key].releaseDate,
          openingText:data[key].openingText
        })
      }
      setMovies(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    
    const response = await fetch("url", {
      method: 'POST',
      body: JSON.stringify(movie),
      Headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('dataa', data)

  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
