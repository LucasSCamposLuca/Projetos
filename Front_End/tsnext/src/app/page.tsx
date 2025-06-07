'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react'
import React from 'react';


export default function Home() {
  const [text, setText] = useState('')
  const fullText = 'Moda que inspira seu estilo único'

  const cards = [
  {
    imagem: "https://plus.unsplash.com/premium_photo-1661319134179-50e9552b63c0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fCVDMyVCM2N1bG9zfGVufDB8fDB8fHww",
    titulo: "Óculos Fashion",
    texto: "Estilo e proteção para seu dia a dia.",
  },
  {
    imagem: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9sc2FzfGVufDB8fDB8fHww",
    titulo: "Bolsas Exclusivas",
    texto: "Elegância para todas as ocasiões.",
  },
  {
    imagem: "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVsJUMzJUIzZ2lvc3xlbnwwfHwwfHx8MA%3D%3D",
    titulo: "Relógios Modernos",
    texto: "Pontualidade com sofisticação.",
  },
  {
    imagem: "https://images.unsplash.com/photo-1590166223826-12dee1677420?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJyaW5jb3N8ZW58MHx8MHx8fDA%3D",
    titulo: "Brincos Finos",
    texto: "Toque de brilho em cada detalhe.",
  },
  {
    imagem: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhcGF0b3N8ZW58MHx8MHx8fDA%3D",
    titulo: "Sapatos Premium",
    texto: "Conforto e estilo nos seus passos.",
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1674617465296-1d8dd5e549ea?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVsc2VpcmFzfGVufDB8fDB8fHww",
    titulo: "Pulseiras Delicadas",
    texto: "Complemento perfeito para seu look.",
  },
];


  useEffect(() => {
    let index = 0
    const typing = setInterval(() => {
      setText(prev => prev + fullText.charAt(index))
      index++
      if (index === fullText.length) clearInterval(typing)
    }, 100)
    return () => clearInterval(typing)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.email as HTMLInputElement).value
    const messageEl = document.getElementById('form-message')

    if (/\S+@\S+\.\S+/.test(email)) {
      if (messageEl) {
        messageEl.textContent = 'Obrigado por se inscrever!'
        messageEl.className = 'text-green-600 font-semibold mt-2'
      }
      form.reset()
    } else {
      if (messageEl) {
        messageEl.textContent = 'Por favor, insira um e-mail válido.'
        messageEl.className = 'text-red-600 font-semibold mt-2'
      }
    }
  }

  return (
    <>
      <header className="bg-black text-white sticky top-0 z-50">
        <nav className="flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold tracking-wide">Moda fast</div>
          <ul className="hidden md:flex gap-6">
            <li><a href="#Apresentacao">Início</a></li>
            <li><a href="#Servicos">Coleção</a></li>
            <li><a href="#Estatisticas">Números</a></li>
            <li><a href="#Marcas">Marcas</a></li>
            <li><a href="#Comentarios">Depoimentos</a></li>
            <li><a href="#Contatos">Contato</a></li>
          </ul>
          <button className="bg-rose-400 hover:bg-rose-500 text-white px-5 py-2 rounded-full font-semibold">
            Comprar Agora
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="Apresentacao" className="flex flex-wrap justify-around items-center gap-10 px-6 py-20 bg-pink-50">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">{text}<span className="animate-pulse">|</span></h1>
            <p className="text-gray-600 text-lg mb-6">Descubra as últimas tendências para transformar seu visual com exclusividade e elegância.</p>
            <a href="#Servicos" className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full font-semibold">Ver Coleção</a>
          </div>
          <img className="max-w-sm rounded-xl shadow-xl" src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&auto=format&fit=crop&q=60" alt="Moda feminina" />
        </section>

        {/* Coleção com scroll infinito */}
    <section className="relative w-full overflow-hidden bg-gray-100 m-[10px] rounded-xl">
      <div className="flex gap-6 animate-scrollLoop w-[200%] p-4">
        {[...Array(2)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex gap-6">
            {cards.map((card, i) => (
              <div
                key={`${loopIndex}-${i}`}
                className="min-w-[280px] bg-white p-4 rounded-xl shadow-md text-center"
              >
                <img
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  src={card.imagem}
                  alt={card.titulo}
                />
                <h3 className="text-xl font-semibold text-rose-700 mb-2">{card.titulo}</h3>
                <p className="text-gray-600">{card.texto}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>

        {/* Estatísticas */}
        <section id="Estatisticas" className="bg-gray-100 py-20 text-center text-gray-700">
          <h2 className="text-3xl font-bold mb-10">Nossos Números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-6">
            {[
              { label: 'Clientes satisfeitos', value: 500 },
              { label: 'Peças vendidas', value: 1200 },
              { label: 'Anos de experiência', value: 27 },
              { label: 'Marcas parceiras', value: 8 },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className="text-4xl font-bold text-black">{stat.value}</h3>
                <p className="font-medium">{stat.label}</p>
                <div className="w-full h-2 mt-2 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${Math.min(stat.value / 12, 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marcas Parceiras */}
        <section id="marcasParceiras" className="bg-white py-20 px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">Marcas Parceiras</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center grayscale hover:grayscale-0 transition-all">
          <img src="/image 3.svg" alt="Chanel" className="h-12 mx-auto" />
          <img src="/image 2.svg" alt="Gucci" className="h-12 mx-auto" />
          <img src="/image 4.svg" alt="Prada" className="h-12 mx-auto" />
          <img src="/image 5.svg" alt="Louis Vuitton" className="h-10 mx-auto" />
          <img src="/image 9.svg" alt="Dior" className="h-12 mx-auto" />
          <img src="/image 6.svg" alt="Balenciaga" className="h-6 mx-auto" />
          <img src="/image 7.svg" alt="Versace" className="h-12 mx-auto" />
          <img src="/image 8.svg" alt="Burberry" className="h-8 mx-auto" />
          </div>
        </section>


        {/* Vídeo de moda */}
        <section id="VideoFashion" className="px-6 py-20 bg-pink-50 flex flex-wrap justify-center gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Inspire-se com Estilo</h2>
            <p className="text-gray-600 text-lg">Explore o universo da moda em movimento. Assista ao nosso vídeo exclusivo e mergulhe em uma coleção que combina elegância e atitude. Mude a forma com a qual vê a moda e transforme sua vida como nunca imaginou antes</p>
          </div>
          <div className="w-full max-w-xl aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/BdYXH6vIEnQ"
              title="YouTube video"
              allowFullScreen
            />
          </div>
        </section>

        {/* Testemunhos */}
        <section id="Comentarios" className="bg-white px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">O que dizem nossos clientes</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'Adoro a qualidade e o atendimento!',
              'Entrega rápida e produtos incríveis.',
              'Minha loja favorita para looks sofisticados.',
            ].map((quote, idx) => (
              <blockquote key={idx} className="bg-pink-50 p-6 rounded-xl shadow-md max-w-sm italic">
                <p className="mb-4">"{quote}"</p>
                <footer className="font-semibold text-rose-600">– Cliente Satisfeito</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section id="Cards" className="bg-white px-6 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Receba nossas novidades</h2>
            <p className="text-gray-600 text-lg mb-6">Inscreva-se para receber as últimas tendências e promoções exclusivas direto no seu e-mail.</p>
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 justify-center">
              <input type="email" name="email" placeholder="Seu melhor e-mail" required className="border border-rose-300 rounded-full px-4 py-2 text-lg w-full sm:w-auto" />
              <button type="submit" className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full font-semibold">Assinar</button>
            </form>
            <p id="form-message" className="mt-4"></p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-10 px-6">
        <div className="flex flex-wrap justify-around gap-8">
          <div>
            <h2 className="text-rose-400 text-xl font-bold mb-2">Contato</h2>
            <p>Email: contato@fashiontrend.com</p>
            <p>Telefone: (11) 99999-9999</p>
          </div>
          <div>
            <h2 className="text-rose-400 text-xl font-bold mb-2">Endereço</h2>
            <p>Rua da Moda, 123 - São Paulo, SP</p>
          </div>
          <div>
            <h2 className="text-rose-400 text-xl font-bold mb-2">Siga-nos</h2>
            <div className="flex gap-4 text-2xl">
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Facebook">👍</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>
        </div>
        <p className="text-center mt-10 text-sm text-gray-400">© 2025 FashionTrend. Todos os direitos reservados.</p>
      </footer>
    </>
  )
}
