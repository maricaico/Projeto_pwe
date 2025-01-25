import Image from "next/image";
import Link from "next/link";

export default async function MovieDetails({ params }) {
  const { id } = params;

  const movie = await fetch(`http://www.omdbapi.com/?apikey=f1cbc41e&i=${id}`).then(res => res.json());

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.Title} ({movie.Year})</h1>
      <Image 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"} 
        alt={`Poster de ${movie.Title}`} 
        width={300} 
        height={450} 
        priority 
      />
      <p><strong>Diretor:</strong> {movie.Director}</p>
      <p><strong>Enredo:</strong> {movie.Plot}</p>
      <p><strong>Gênero:</strong> {movie.Genre}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const allMovies = await fetch('https://www.omdbapi.com/?apikey=f1cbc41e&s=lady').then((res) => res.json());
  
  return allMovies.Search.map((movie) => ({
    id: movie.imdbID,
  }));
}

export async function MovieList() {
  const allMovies = await fetch('https://www.omdbapi.com/?apikey=f1cbc41e&s=lady').then((res) => res.json());

  return (
    <div>
      {allMovies.Search.map((movie) => (
        <div key={movie.imdbID}>
          <Link href={`/movie/${movie.imdbID}`}>
            {movie.Title} ({movie.Year})
          </Link>
        </div>
      ))}
    </div>
  );
}