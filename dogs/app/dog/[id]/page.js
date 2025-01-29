import { FaArrowLeft } from 'react-icons/fa';

export default async function DogDetailPage({ params }) {
  const { id } = params;

  let breeds = [];
  try {
    const res = await fetch('http://localhost:3000/api/dogs'); // Agora usando a API interna
    breeds = await res.json();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }

  const breed = breeds.find((b) => b.id.toString() === id);

  if (!breed) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Raça não encontrada.</p>;
  }

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
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  let breeds = [];
  try {
    const res = await fetch('http://localhost:3000/api/dogs'); // Agora usando a API interna
    breeds = await res.json();
  } catch (error) {
    console.error('Failed to fetch breeds:', error);
  }

  return breeds.map((breed) => ({
    id: breed.id.toString(),
  }));
}

