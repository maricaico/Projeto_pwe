"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [hover, setHover] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: 'url("/dog-background.jpg")', // Caminho da imagem
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <h1 style={{
        color: '#fff', 
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
        marginBottom: '20px'
      }}>
        Você gosta de cachorros? Então clica aqui!
      </h1>
      <Link href="/dog">
        <button 
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#2980b9',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s',
            transform: hover ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Ir para os cachorros 🐶
        </button>
      </Link>
    </div>
  );
}
