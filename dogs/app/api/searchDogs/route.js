export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const breedSearchKey = searchParams.get("breedSearchKey"); // Obtém o parâmetro de busca

    if (!breedSearchKey) {
        return new Response(
            JSON.stringify({ error: "A chave de pesquisa é obrigatória." }),
            { status: 400 }
        );
    }

    try {
        const httpRes = await fetch(
            `https://api.thedogapi.com/v1/breeds/search?q=${breedSearchKey}`,
            {
                headers: {
                    "x-api-key": "live_pOQ2TiCXc83WSsu3Fa0GdlngIAPfxNBiJf6ss2McS17uuilgeOsXQzx0nSINXg1B", // API Key
                },
            }
        );

        const jsonRes = await httpRes.json();

        if (jsonRes.length === 0) {
            return new Response(
                JSON.stringify({ error: "Nenhuma raça encontrada." }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(jsonRes), { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar raças na API de cachorros:", error);
        return new Response(
            JSON.stringify({ error: "Erro interno do servidor." }),
            { status: 500 }
        );
    }
}

