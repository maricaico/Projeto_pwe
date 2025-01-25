"use client";

import { searchMovies } from "../actions/movieActions";
import Form from "next/form";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState({});

  async function handleAction(formData) {
    const res = await searchMovies(formData);
    setData(res);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pesquisar Filmes</h1>
      <MovieForm actionHandler={handleAction} />
      {data.Search && <MovieTable movies={data.Search} />}
    </div>
  );
}

export function MovieForm({ actionHandler }) {
  return (
    <Form action={actionHandler} className="flex flex-col gap-4 max-w-md mx-auto">
      <label htmlFor="idTitleSearchKey" className="text-lg font-medium">
        Título
      </label>
      <input
        id="idTitleSearchKey"
        name="titleSearchKey"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite o título do filme..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Pesquisar
      </button>
    </Form>
  );
}

export function MovieTable({ movies }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
        >
          <Link href={`/movie/${movie.imdbID}`}>
            <a className="text-blue-600 hover:underline">
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p className="text-sm text-gray-600">{movie.Year}</p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}




