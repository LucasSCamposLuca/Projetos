// components/HomePage.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  // Estado para menu mobile toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Estado para mensagem do formulário newsletter
  const [formMessage, setFormMessage] = useState({ text: '', color: '' });

  // Estado do input de email
  const [email, setEmail] = useState('');

  // Typed text effect
  const [typedText, setTypedText] = useState('');
  const fullText = 'Moda que inspira seu estilo único';

  // Ref para stats animados
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  const statsData = [
    { id: 1, value: 95, label: 'Qualidade', barPercent: Math.min(95 / 12, 100) },
    { id: 2, value: 85, label: 'Satisfação', barPercent: Math.min(85 / 12, 100) },
    { id: 3, value: 90, label: 'Entrega', barPercent: Math.min(90 / 12, 100) },
  ];

  // Typed text effect - similar a typeWriter
  useEffect(() => {
    let index = 0;
    function typeWriter() {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
        setTimeout(typeWriter, 100);
      }
    }
    typeWriter();
  }, []);

  // Intersection observer para stats
  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [statsAnimated]);

  // Contador animado para stats
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    if (!statsAnimated) return;

    statsData.forEach((stat, i) => {
      let current = 0;
      const step = Math.ceil(stat.value / 100);
      const speed = 20;

      const interval = setInterval(() => {
        current += step;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = current;
          return newCounts;
        });
      }, speed);
    });
  }, [statsAnimated]);

  // Validação do e-mail
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Handle submit newsletter
  function handleSubmit(e) {
    e.preventDefault();
    if (validateEmail(email)) {
      setFormMessage({ text: 'Obrigado por se inscrever!', color: 'text-green-500' });
      setEmail('');
    } else {
      setFormMessage({ text: 'Por favor, insira um e-mail válido.', color: 'text-red-600' });
    }
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-black text-white flex justify-between items-center p-4 sticky top-0 z-50">
        <div className="text-2xl font-bold tracking-wide select-none cursor-pointer">Logo</div>

        <ul
          className={`flex gap-6 ${
            menuOpen ? 'flex flex-col absolute right-4 top-14 bg-black rounded-md p-4 w-48' : 'hidden md:flex'
          }`}
        >
          <li>
            <a href="#" className="hover:text-pink-400 font-medium text-lg">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-pink-400 font-medium text-lg">
              Serviços
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-pink-400 font-medium text-lg">
              Contato
            </a>
          </li>
          <li>
            <button className="btn-primary bg-pink-400 rounded-full px-5 py-2 text-white font-semibold hover:bg-pink-600">
              Entrar
            </button>
          </li>
        </ul>

        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-around p-12 bg-pink-50 gap-10 flex-wrap">
        <div className="max-w-xl text-center md:text-left">
          <h1 id="hero-title" className="text-5xl font-extrabold mb-6 relative after:content-['|'] after:animate-blink after:ml-1 after:text-black after:font-bold">
            {typedText}
          </h1>
          <p className="text-xl text-gray-600 mb-8">Explore a moda que expressa seu estilo único com exclusividade e elegância.</p>
          <button className="btn-primary bg-pink-400 rounded-full px-8 py-3 text-white font-semibold hover:bg-pink-600">
            Saiba mais
          </button>
        </div>
        <div className="max-w-lg w-full">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Moda"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20 px-5 overflow-hidden">
        <h2 className="text-3xl font-semibold text-center mb-16 text-gray-900">Nossos Serviços</h2>
        <div className="services-cards-wrapper overflow-hidden relative">
          <div className="flex gap-10 animate-scrollLoop w-max">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card flex-shrink-0 w-72 bg-pink-50 rounded-xl shadow-md p-5 cursor-pointer hover:-translate-y-2 transition-transform duration-300 text-center">
                <img
                  src={`https://source.unsplash.com/280x280/?fashion,${i}`}
                  alt={`Serviço ${i + 1}`}
                  className="rounded-lg mb-4 object-cover h-48 w-full"
                />
                <h3 className="text-2xl font-semibold mb-2 text-pink-700">Serviço {i + 1}</h3>
                <p className="text-gray-600 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, veritatis!
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="bg-pink-300 text-white py-16 px-5 text-center"
        ref={statsRef}
      >
        <h2 className="text-4xl font-bold mb-10">Nossas Estatísticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {statsData.map((stat, i) => (
            <div key={stat.id} className="stat-item">
              <h3 className="text-6xl font-extrabold mb-3">{counts[i]}</h3>
              <p className="text-xl font-semibold mb-3">{stat.label}</p>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-5 mx-auto max-w-xs">
                <div
                  className="bar-fill bg-pink-700 h-5 rounded-full transition-all duration-500"
                  style={{ width: statsAnimated ? `${stat.barPercent}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-16 px-5 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Inscreva-se na Newsletter</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Receba atualizações exclusivas diretamente no seu e-mail.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow p-3 rounded border border-gray-300 focus:border-pink-400 focus:outline-none transition"
            required
          />
          <button
            type="submit"
            className="bg-pink-400 hover:bg-pink-600 text-white font-semibold rounded px-6 py-3 transition"
          >
            Enviar
          </button>
        </form>

        {formMessage.text && (
          <p className={`mt-4 text-lg font-semibold ${formMessage.color}`}>{formMessage.text}</p>
        )}
      </section>

      <style jsx>{`
        /* Cursor blink animation */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        #hero-title::after {
          content: '|';
          animation: blink 1s infinite;
          margin-left: 4px;
          font-weight: 900;
          color: black;
        }

        /* Scroll animation para cards serviços */
        .animate-scrollLoop {
          animation: scrollLoop 30s linear infinite;
        }
        @keyframes scrollLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
