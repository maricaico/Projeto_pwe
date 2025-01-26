
'use client';

import { useState } from 'react';

export default function DogsPage() {
  const [breedSearchKey, setBreedSearchKey] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${breedSearchKey}`;
      const res = await fetch(apiUrl, {
        headers: {
          'x-api-key': 'live_pOQ2TiCXc83WSsu3Fa0GdlngIAPfxNBiJf6ss2McS17uuilgeOsXQzx0nSINXg1B',
        },
      });
      const data = await res.json();

      if (data.length > 0) {
        setResults(data);
      } else {
        setError('Nenhuma raça encontrada.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao buscar as raças.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Formulário de Pesquisa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="breedSearchKey">Raça</label>
          <input
            id="breedSearchKey"
            type="text"
            value={breedSearchKey}
            onChange={(e) => setBreedSearchKey(e.target.value)}
            placeholder="Digite o nome da raça"
            required
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginRight: '10px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Pesquisar
          </button>
        </div>
      </form>

      {/* Resultados da Pesquisa */}
      <div>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && results.length > 0 && (
          <div>
            <h2>Resultados:</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {results.map((breed) => (
                <li
                  key={breed.id}
                  style={{
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <strong style={{ fontSize: '18px' }}>{breed.name}</strong>
                  {breed.temperament && (
                    <p style={{ margin: '5px 0' }}>
                      <strong>Temperamento:</strong> {breed.temperament}
                    </p>
                  )}
                  {breed.height?.metric && (
                    <p style={{ margin: '5px 0' }}>
                      <strong>Altura:</strong> {breed.height.metric} cm
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!loading && !error && results.length === 0 && <p>Sem resultados.</p>}
      </div>
    </div>
  );
}

