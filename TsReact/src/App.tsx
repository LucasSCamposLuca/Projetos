import { useState } from 'react'
import reactLogo from './assets/react.svg'
import tenisimg from './assets/JD8-6467-006_zoom2.webp'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="app-container">
      <header>
        <h1>Meu Portfólio</h1>
        <nav>
          <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#projetos">Projetos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="sobre">
          <h2>Sobre Mim</h2>
          <p>Sou um desenvolvedor apaixonado por criar soluções com React, Java e segurança digital.</p>
        </section>

        <section id="projetos">
          <h2>Meus Projetos</h2>
          <div className="projetos">
            <div className="projeto">
              <h3>Chatbot para WhatsApp</h3>
              <p>Backend em Java, integração com API em Python, banco MySQL e Docker.</p>
            </div>
            <div className="projeto">
              <h3>Portfólio Interativo</h3>
              <p>Feito com React + Vite, animações em CSS, layout responsivo.</p>
            </div>
          </div>
        </section>

        <section id="contato">
          <h2>Contato</h2>
          <p>Email: seuemail@example.com</p>
          <p>LinkedIn: <a href="https://linkedin.com/in/seuusuario" target="_blank">/seuusuario</a></p>
        </section>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </main>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl">
        <img
          className="w-full h-56 object-cover"
          src={tenisimg}
          alt="Tênis"
        />

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Tênis Esportivo Pro X</h2>
          <p className="text-gray-600 mt-1">
            Conforto e performance com estilo. Ideal para corridas e treinos.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">R$ 199,99</span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>

      <footer>
        <p>&copy; {new Date().getFullYear()} Seu Nome. Todos os direitos reservados.</p>
      </footer>
    </div>
    </>
  )
}

export default App
