'use client';

import { useEffect, useState } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa'; 

export default function HomePage() {
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': 'live_pOQ2TiCXc83WSsu3Fa0GdlngIAPfxNBiJf6ss2McS17uuilgeOsXQzx0nSINXg1B',
          },
        });
        const data = await res.json();
        setBreeds(data);
        setFilteredBreeds(data);
      } catch (err) {
        setError('Erro ao carregar raças de cachorros.');
      } finally {
        setLoading(false);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const filtered = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBreeds(filtered);
  }, [searchTerm, breeds]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#eaeaea' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2980b9',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '20px',
        }}>
          <FaHome />
        </a>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: '25px',
          padding: '5px',
          border: '1px solid #bdc3c7',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <FaSearch style={{ color: '#bdc3c7', marginLeft: '10px' }} />
          <input
            type="text"
            placeholder="Buscar auau..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '250px',
              border: 'none',
              borderRadius: '25px',
              outline: 'none',
              fontSize: '16px',
              color: '#34495e',
            }}
          />
        </div>
      </div>
      <h1 style={{ color: '#34495e', textAlign: 'center', marginTop: '10px' }}>Projeto Auauron e Mauauriana</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {filteredBreeds.map((breed) => (
          <a
            key={breed.id}
            href={`/dog/${breed.id}`}
            style={{
              textDecoration: 'none',
              color: 'black',
              border: '1px solid #ddd',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
              backgroundColor: '#fff',
              padding: '10px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
              alt={breed.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
            />
            <div style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', color: '#2c3e50' }}>
              {breed.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
