"use server";

export async function searchDogs(formData) {
    const breedSearchKey = formData.get("breed"); // Obtém a chave de pesquisa enviada pelo formulário

    if (!breedSearchKey || breedSearchKey.trim() === "") return { dogs: [] };

    try {
        const baseUrl = `https://api.thedogapi.com/v1/breeds/search`;
        const query = `q=${encodeURIComponent(breedSearchKey)}`;
        const httpRes = await fetch(`${baseUrl}?${query}`, {
            headers: {
                "x-api-key": "live_pOQ2TiCXc83WSsu3Fa0GdlngIAPfxNBiJf6ss2McS17uuilgeOsXQzx0nSINXg1B", // API Key
            },
        });

        const jsonRes = await httpRes.json();

        return { dogs: jsonRes };
    } catch (err) {
        return { error: `Erro na requisição: ${err}` };
    }
}

