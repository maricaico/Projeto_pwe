"use client";

import { searchDogs } from "../actions/dogActions";
import Form from "next/form";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [data, setData] = useState({});

    async function handleAction(formData) {
        const res = await searchDogs(formData);
        setData(res);
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Raças de Cachorro</h1>
            <DogForm actionHandler={handleAction} />
            {data.dogs && <DogTable dogs={data.dogs} />}
        </div>
    );
}

export function DogForm({ actionHandler }) {
    return (
        <Form action={actionHandler} className="flex flex-col gap-4 max-w-md mx-auto">
            <label htmlFor="idBreed" className="text-lg font-medium">
                Raça
            </label>
            <input
                id="idBreed"
                name="breed"
                placeholder="Digite o nome da raça"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export function DogTable({ dogs }) {
    return (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dogs.map((dog) => (
                <div
                    key={dog.id}
                    className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
                >
                    <h3 className="text-lg font-semibold">{dog.name}</h3>
                    <p className="text-sm text-gray-600">
                        {dog.bred_for || "Informação não disponível"}
                    </p>
                    {dog.image?.url && (
                        <Link href={`/dog/${dog.id}`}>
                            <img
                                src={dog.image.url}
                                alt={dog.name}
                                className="w-full h-auto rounded-lg"
                            />
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
}


