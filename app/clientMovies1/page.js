"use client";

import { searchMovies } from "../actions/movieActions";
import Form from "next/form";
import { useState } from "react";

export default function Home() {
    const [data, setData] = useState({});

    async function handleAction(formData) {
        const res = await searchMovies(formData);
        setData(res);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Busca de Filmes, Séries e Episódios</h1>
            <MovieForm actionHandler={handleAction} />
            {data.Search?.length > 0 ? (
                <MovieTable movies={data.Search} />
            ) : (
                <div className="mt-6 text-center text-gray-600">Nenhum resultado encontrado</div>
            )}
        </div>
    );
}

export function MovieTable({ movies }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {movies.map((movie) => (
                <div key={movie.imdbID} className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-lg font-semibold">{movie.Title}</h2>
                    <p className="text-sm text-gray-600">{movie.Type} - {movie.Year}</p>
                </div>
            ))}
        </div>
    );
}

export function MovieForm({ actionHandler }) {
    return (
        <Form action={actionHandler} className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="idTitleSearchKey" className="block text-gray-700 font-medium mb-2">Título:</label>
                <input 
                    id="idTitleSearchKey" 
                    name="titleSearchKey" 
                    placeholder="Digite o título" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            <div className="mb-4">
                <label htmlFor="idTypeSearchKey" className="block text-gray-700 font-medium mb-2">Tipo:</label>
                <select 
                    id="idTypeSearchKey" 
                    name="typeSearchKey" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Todos</option>
                    <option value="movie">Filme</option>
                    <option value="series">Série</option>
                    <option value="episode">Episódio</option>
                </select>
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                Pesquisar
            </button>
        </Form>
    );
}

