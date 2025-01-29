export async function GET() {
    try {
        const res = await fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY,
            },
        });

        if (!res.ok) {
            throw new Error("Erro ao buscar dados da API externa.");
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return new Response(JSON.stringify({ error: "Erro ao buscar os dados" }), { status: 500 });
    }
}
