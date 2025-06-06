'use client';

import { useEffect, useRef, useState } from 'react';

export default function Homepage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]); // ref para os cards
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  
  

  const produtos = [
    {
      nome: 'Camiseta Azul',
      imagem:
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60',
    },
    {
      nome: 'Tênis Esportivo',
      imagem:
        'https://images.unsplash.com/photo-1558004282-e2b2587e3e47?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Calça Moda masculina',
      imagem:
        'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Jaqueta Corrida',
      imagem:
        'https://images.unsplash.com/photo-1552327359-d86398116072?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const images = [
    'https://images.unsplash.com/photo-1580047883831-5db03837b0b3?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557002666-513ca8eaa3c8?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1641311821670-d746f909dc78?q=80&w=1935&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616715623022-65d18f0042ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGphcXVldGF8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const loopImages = [...images, ...images];

  // Scroll horizontal infinito para as imagens
  useEffect(() => {
    
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      container.scrollLeft += 0.5;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Mostrar welcome com animação fade + slide
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcomeVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Intersection Observer para animar cards ao aparecer na viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.classList.add('opacity-100', 'translate-y-0');
            card.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(card);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [produtos]);

  // Estado para controlar imagens carregadas (fade-in)
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    Array(loopImages.length).fill(false)
  );

  // Função chamada ao carregar imagem para setar fade-in
  function handleImageLoad(index: number) {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100   "> //fade-in
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-md p-6 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Dashboard
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Produtos
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Pedidos
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Configurações
          </a>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 ml-0 md:ml-0">
        {/* Navbar */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-center items-center z-10">
          <button
            className="p-2 text-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="text-center text-2xl font-bold text-blue-600">
            Moda Fast
          </div>
        </header>

        {/* Seção Boas-Vindas com fade + slide */}
{/* Seção de Apresentação com Efeito de Digitação */}
<section
  className="relative h-[600px] flex items-center justify-center overflow-hidden bg-fixed bg-cover bg-center text-white"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=60')",
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
  }}
>
  <div
    ref={welcomeRef}
    className={`relative text-center bg-black/30 p-6 rounded-lg inline-block transition-all duration-700 ease-in-out 
      ${welcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
  >
    <h1 className="text-4xl font-bold drop-shadow-lg typing">
      Bem-vindo à <span className="text-yellow-300">Moda Fast</span>
    </h1>
    <p className="mt-4 text-lg drop-shadow-sm">
      Moda é mais do que vestir — é expressar quem você é todos os dias.
    </p>
  </div>

  <style>
    {`
      .typing {
        overflow: hidden;
        border-right: .15em solid white;
        white-space: nowrap;
        margin: 0 auto;
        letter-spacing: .1em;
        animation: typing 3s steps(30, end), blink-caret 0.75s step-end infinite;
        max-width: 100%;
      }

      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }

      @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: white }
      }
    `}
  </style>
</section>



        

        {/* Cards */}
        <main className="p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
    {produtos.map((produto, index) => (
      <div
        key={index}
        ref={(el) => (cardsRef.current[index] = el)}
        className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-700 opacity-0 translate-y-10 hover:scale-105 hover:shadow-lg group"
      >
        <div className="overflow-hidden">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{produto.nome}</h3>
          <p className="text-gray-600">Descrição breve do produto.</p>
        </div>
      </div>
    ))}
  </div>
</main>

        {/* Seções explicativas sobre moda */}
<section className="px-6 py-12 bg-white">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="flex flex-col items-center text-center">
      <img
        src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60"
        alt="Tendências de Moda"
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-2xl font-bold mb-2">Tendências de Moda</h2>
      <p className="text-gray-700">
        Fique por dentro das últimas tendências que estão dominando as passarelas e as ruas, para você estar sempre atualizado e elegante.
      </p>
    </div>

    <div className="flex flex-col items-center text-center">
      <img
        src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=60"
        alt="Moda Sustentável"
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-2xl font-bold mb-2">Moda Sustentável</h2>
      <p className="text-gray-700">
        Conheça práticas conscientes e escolhas sustentáveis que fazem bem para o planeta sem abrir mão do estilo e da qualidade.
      </p>
    </div>

    <div className="flex flex-col items-center text-center">
      <img
        src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=60"
        alt="Estilos Clássicos"
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-2xl font-bold mb-2">Estilos Clássicos</h2>
      <p className="text-gray-700">
        Saiba como incorporar peças clássicas e atemporais no seu guarda-roupa, garantindo versatilidade e elegância para todas as ocasiões.
      </p>
    </div>

    <div className="flex flex-col items-center text-center">
      <img
        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=60"
        alt="Dicas de Combinação"
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-2xl font-bold mb-2">Dicas de Combinação</h2>
      <p className="text-gray-700">
        Aprenda truques para combinar cores, estampas e acessórios e criar looks harmoniosos que destacam sua personalidade.
      </p>
    </div>
  </div>
</section>

{/* Nova seção lado a lado */}
<section className="w-full mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10 bg-white text-neutral-900 rounded-lg shadow-lg border border-gray-300">
  <div className="md:w-1/2">
    <h2 className="text-3xl font-bold mb-4">A Importância da Moda na Autoexpressão</h2>
    <p className="text-lg leading-relaxed">
      A moda vai além do simples vestir; ela é uma poderosa forma de comunicar quem somos, refletindo nossa personalidade,
      cultura e valores. Escolher o que usar é um ato de criatividade e autenticidade, que pode influenciar a autoestima e o
      modo como nos relacionamos com o mundo ao nosso redor.
    </p>
  </div>
  <div className="md:w-1/2">
    <img
      src="https://images.unsplash.com/flagged/photo-1578398297852-4d2bfe74cefe?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Autoexpressão pela moda"
      className="rounded-lg shadow-lg w-full object-cover max-h-96"
    />
  </div>
</section>

<section className="scroll-image-section">
  <div className="scroll-content no-scrollbar">
    {loopImages.map((img, i) => (
      <div
        key={i}
        className={`image-wrapper ${loadedImages[i] ? 'visible' : 'hidden'}`}
      >
        <img
          src={img}
          alt={`Scroll Image ${i + 1}`}
          onLoad={() => handleImageLoad(i)}
          draggable={false}
        />
      </div>
    ))}
  </div>
</section>



{'Testes'}
{/* <section>
  <div className="flex justify-center items-center h-screen bg-gray-900">
        <img
          className="rotate-3d-animation rounded-lg shadow-lg"
          src="https://images.unsplash.com/flagged/photo-1578398297852-4d2bfe74cefe?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Imagem 3D rotacionando"
        />
      </div>


  <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img
        className="h-48 w-full object-cover md:h-full md:w-48"
        src="/img/building.jpg"
        alt="Modern building architecture"
      />
    </div>
    <div className="p-8">
      <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div>
      <a href="#" className="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p className="mt-2 text-gray-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
        places to do just that.
      </p>
    </div>
  </div>
</div>


</section> */}
<footer className="bg-gray-900 text-white py-10 mt-10">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
    {/* Informações de contato */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Entre em Contato</h2>
      <p className="mb-2">Empresa Fictícia</p>
      <p className="mb-2">Email: contato@empresa.com</p>
      <p className="mb-2">Telefone: (11) 91234-5678</p>
      <p>Endereço: Av. Imaginária, 456 - São Paulo, SP</p>
    </div>

    {/* Redes sociais com Material Icons */}
    <div className="md:text-right">
      <h2 className="text-xl font-semibold mb-4">Siga nas Redes</h2>
      <div className="flex md:justify-end gap-4 text-2xl">
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <span className="material-icons">facebook</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <span className="material-icons">instagram</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <span className="material-icons">linkedin</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
          <span className="material-icons">email</span>
        </a>
      </div>
    </div>
  </div>

  <div className="text-center text-gray-400 text-sm mt-8">
    © 2025 Empresa Fictícia. Todos os direitos reservados.
  </div>
</footer>



      </div>
    </div>
  );
}
