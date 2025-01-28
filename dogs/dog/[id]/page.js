'use client';

import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Ícone de voltar

export default function DogDetailPage({ params }) {
  const { id } = params;
  const [breed, setBreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreedDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.thedogapi.com/v1/breeds`);
        const data = await res.json();
        const selectedBreed = data.find((b) => b.id.toString() === id);

        if (selectedBreed) {
          setBreed(selectedBreed);
        } else {
          setError('Raça não encontrada.');
        }
      } catch (err) {
        setError('Erro ao carregar detalhes da raça.');
      } finally {
        setLoading(false);
      }
    };

    fetchBreedDetails();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#eaeaea' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/dog" style={{
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
          <FaArrowLeft />
        </a>
      </div>
      <h1 style={{ color: '#34495e', textAlign: 'center' }}>{breed.name}</h1>
      <div style={{ textAlign: 'center' }}>
        <img
          src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
          alt={breed.name}
          style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', objectFit: 'cover' }}
        />
      </div>
      <div style={{ marginTop: '20px', fontSize: '18px', color: '#34495e', textAlign: 'center' }}>
        <p><strong>Temperamento:</strong> {breed.temperament}</p>
        <p><strong>Altura:</strong> {breed.height.metric} cm</p>
        <p><strong>Peso:</strong> {breed.weight.metric} kg</p>
        <p><strong>Expectativa de vida:</strong> {breed.life_span}</p>
        <p><strong>Origem:</strong> {breed.origin || 'Desconhecida'}</p>
        <p><strong>Grupo:</strong> {breed.group || 'Desconhecido'}</p>
        <p><strong>Variações:</strong> {breed.variations ? breed.variations.join(', ') : 'Nenhuma'}</p>
      </div>
    </div>
  );
}
