export default async function Home({ searchParams }) {
  // Configuração dos parâmetros de busca
  const resolvedSearchParams = await searchParams;
  const breed = resolvedSearchParams?.breed || ''; // Parâmetro "breed" para buscar raças
  const limit = resolvedSearchParams?.limit || '10'; // Limite de resultados por página

  // URL da Dog API
  const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${breed}&limit=${limit}`;
  
  // Requisição para a Dog API com a chave de autenticação
  const res = await fetch(apiUrl, {
    headers: {
      'x-api-key': 'live_pOQ2TiCXc83WSsu3Fa0GdlngIAPfxNBiJf6ss2McS17uuilgeOsXQzx0nSINXg1B',
    },
  });
  const data = await res.json();

  // Caso não encontre resultados
  if (!data || data.length === 0) {
    return (
      <div>
        <h1>Erro na busca</h1>
        <p>Nenhum resultado encontrado para "{breed}"</p>
      </div>
    );
  }

  // Exibição dos resultados
  return (
    <div>
      <h1>Resultados da Pesquisa</h1>
      <p>
        <strong>Raça Pesquisada:</strong> {breed || "Todas as raças"}
      </p>
      <p>
        <strong>Quantidade de Resultados:</strong> {data.length}
      </p>
      <div>
        {data.map((dog) => (
          <div
            key={dog.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Raça:</strong> {dog.name}
            </p>
            <p>
              <strong>Origem:</strong> {dog.origin || "Desconhecida"}
            </p>
            <p>
              <strong>Temperamento:</strong> {dog.temperament || "Não informado"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

  