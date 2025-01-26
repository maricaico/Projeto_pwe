import Image from "next/image";

export default async function DogDetails({ params }) {
    const { id } = params;

    try {
        const dog = await fetch(`https://api.thedogapi.com/v1/breeds/${id}`, {
            headers: {
                "x-api-key": "live_pOQ2TiCXc83WSsu3Fa0GdlngIAPfxNBiJf6ss2McS17uuilgeOsXQzx0nSINXg1B",
            },
        }).then(async (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        });

        const imageUrl =
            dog.image?.url ||
            `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`;

        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{dog.name}</h1>
                <Image
                    src={imageUrl}
                    alt={dog.name}
                    width={300}
                    height={450}
                    className="rounded-lg"
                />
                <p className="mt-4"><strong>Bred for:</strong> {dog.bred_for || "N/A"}</p>
                <p><strong>Temperament:</strong> {dog.temperament || "N/A"}</p>
                <p><strong>Breed Group:</strong> {dog.breed_group || "N/A"}</p>
                <p><strong>Life Span:</strong> {dog.life_span || "N/A"}</p>
                <p><strong>Origin:</strong> {dog.origin || "N/A"}</p>
            </div>
        );
    } catch (err) {
        console.error("Erro ao buscar dados do cachorro:", err.message);
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Erro ao carregar os detalhes do cachorro</h1>
                <p className="text-red-500">{err.message}</p>
            </div>
        );
    }
}
export async function generateStaticParams() {
    try {
        const allBreeds = await fetch("https://api.thedogapi.com/v1/breeds", {
            headers: {
                "x-api-key": "live_pOQ2TiCXc83WSsu3Fa0GdlngIAPfxNBiJf6ss2McS17uuilgeOsXQzx0nSINXg1B",
            },
        }).then((res) => res.json());

        // Filtrar apenas raças válidas com IDs disponíveis
        return allBreeds
            .filter((breed) => breed.id)
            .map((breed) => ({
                id: breed.id.toString(),
            }));
    } catch (err) {
        console.error("Erro ao gerar parâmetros estáticos:", err.message);
        return [];
    }
}
