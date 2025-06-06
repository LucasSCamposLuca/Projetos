// Toggle menu mobile
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Newsletter form submit
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = newsletterForm.email.value;

    if (validateEmail(emailInput)) {
        formMessage.style.color = '#4caf50';
        formMessage.textContent = 'Obrigado por se inscrever!';
        newsletterForm.reset();
    } else {
        formMessage.style.color = '#b34747';
        formMessage.textContent = 'Por favor, insira um e-mail válido.';
    }
});

function validateEmail(email) {
    // Regex simples para validar e-mail
    return /\S+@\S+\.\S+/.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
  const text = "Moda que inspira seu estilo único";
  const heroTitle = document.getElementById("hero-title");
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100); // velocidade de digitação
    }
  }

  typeWriter();
});

document.addEventListener('DOMContentLoaded', () => {
  const stats = document.querySelectorAll('.stat-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const value = parseInt(el.dataset.value);
        const countEl = el.querySelector('.count');
        const bar = el.querySelector('.bar-fill');

        let current = 0;
        const step = Math.ceil(value / 100);
        const speed = 20;

        const counter = setInterval(() => {
          current += step;
          if (current >= value) {
            current = value;
            clearInterval(counter);
          }
          countEl.textContent = current;
        }, speed);

        bar.style.width = `${Math.min(value / 12, 100)}%`; // ajusta a barra proporcionalmente
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  stats.forEach(stat => observer.observe(stat));
});

