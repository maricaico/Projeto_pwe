"use client";

import { useState } from "react";

export default function ClientDogs1() {
    const [data, setData] = useState([]); // Armazena os resultados
    const [error, setError] = useState(null); // Armazena erros, se houver

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const breedSearchKey = formData.get("breedSearchKey");

        try {
            // Faz a requisição à API interna
            const res = await fetch(`/api/searchDogs?breedSearchKey=${breedSearchKey}`);
            const json = await res.json();

            if (!res.ok) {
                setError(json.error || "Erro desconhecido.");
                setData([]); // Zera os dados
                return;
            }

            setError(null); // Zera erros
            setData(json); // Atualiza com os resultados
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setError("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Busca de Raças de Cachorros
            </h1>
            {/* Formulário */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
                <div className="mb-4">
                    <label
                        htmlFor="breedSearchKey"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Nome da Raça:
                    </label>
                    <input
                        id="breedSearchKey"
                        name="breedSearchKey"
                        placeholder="Digite o nome da raça"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    Pesquisar
                </button>
            </form>

            {/* Exibição de Erros */}
            {error && (
                <div className="mt-6 text-center text-red-500">
                    {error}
                </div>
            )}

            {/* Resultados */}
            {data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {data.map((breed) => (
                        <div key={breed.id} className="bg-white p-4 shadow-md rounded-md">
                            <h2 className="text-lg font-semibold">{breed.name}</h2>
                            {breed.reference_image_id ? (
                                <img
                                    src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
                                    alt={`Imagem da raça ${breed.name}`}
                                    className="w-full h-48 object-cover rounded-md mt-4"
                                />
                            ) : (
                                <p className="text-sm text-gray-600">Sem imagem disponível.</p>
                            )}
                            <p className="text-sm text-gray-600">
                                Temperamento: {breed.temperament || "Desconhecido"}
                            </p>
                            <p className="text-sm text-gray-600">
                                Altura: {breed.height.metric} cm
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


