interface MoviesProps {}

const Movies: React.FC<MoviesProps> = () => {
  const debug = true;

  if (debug) console.log('Movies/render: ');

  return <h1>Movies</h1>;
};

export default Movies;
