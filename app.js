/* ==========================================================================
   LÓGICA E INTERACTIVIDAD - LUIS OSVALDO GONZÁLEZ MONROY PORTAFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initTypingEffect();
  initSmoothScroll();
  initProjectFilters();
  initProjectModals();
  initArticleModals();
  initSkillBars();
  initContactForm();
});

/* 1. TEMA CLARO / OSCURO CON LOCALSTORAGE */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

/* 2. MENÚ MÓVIL RESPONSIVO */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    menuBtn.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* 3. EFECTO MAQUINA DE ESCRIBIR (TYPING EFFECT) */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = [
    'Inteligencia Artificial Agéntica & Generativa',
    'Transformación Digital & E-Commerce',
    'Antigravity AI & Tecnologías Emergentes',
    'Mentor de Exportación & Consultoría',
    'Docencia e Innovación Académica (AIEP)'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pausa al completar la frase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* 4. NAVEGACIÓN SUAVE E INDICADOR ACTIVO */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 5. FILTRADO DE PROYECTOS */
function initProjectFilters() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* 6. MODALES DE DETALLE DE PROYECTO */
const projectDetailsData = {
  1: {
    title: 'Transformación Digital y Personalización de Servicios',
    company: 'Startup Arnou',
    period: '2020 - Actualidad',
    description: 'Estrategia integral de digitalización con incorporación de herramientas de Inteligencia Artificial generativa para personalizar la experiencia de usuario y optimizar procesos comerciales.',
    highlights: [
      'Implementación exitosa de 2 plataformas digitales con impacto directo en operaciones.',
      'Optimización de modelos de negocio B2B y B2C.',
      'Auditoría continua de madurez digital y analítica de datos GA4.'
    ]
  },
  2: {
    title: 'Key360Chile - Plataforma B2B de Conexión de Talento',
    company: 'Key360Chile (Fundador & CEO)',
    period: '2019 - 2021',
    description: 'Desarrollo y lanzamiento de una plataforma digital B2B diseñada para conectar talento técnico especializado con clientes corporativos y startups tecnológicas.',
    highlights: [
      'Estrategia de posicionamiento de marca y transferencia tecnológica.',
      'Alianza con clientes corporativos y colaboración activa con startups de la región.',
      'Estructuración de modelo de negocio escalable e indicadores comerciales.'
    ]
  },
  3: {
    title: 'Estrategia de IA Generativa & Analítica GA4 Aplicada',
    company: 'Consultoría e Innovación AIEP / Arnou',
    period: '2022 - Presente',
    description: 'Diseño e impartición de metodologías avanzadas de procesamiento de datos, IA generativa (ChatGPT, Gemini, Midjourney) y analítica con GA4 y Looker Studio para marketing y optimización de ventas.',
    highlights: [
      'Mentoría a más de 80 estudiantes, docentes y empresas.',
      'Co-creador fundacional de la carrera de Técnico en Marketing Digital AIEP.',
      'Uso ético y estratégico de IA generativa para automatización comercial.'
    ]
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !closeBtn) return;

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsData[projectId];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-meta').textContent = `${data.company} | ${data.period}`;
        document.getElementById('modal-desc').textContent = data.description;

        const highlightsList = document.getElementById('modal-highlights');
        highlightsList.innerHTML = '';
        data.highlights.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          highlightsList.appendChild(li);
        });

        modal.classList.add('active');
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

const articleDetailsData = {
  1: {
    category: 'Inteligencia Artificial',
    title: 'IA Generativa en Marketing: Ética, Estrategia e Impacto Real en 2026',
    date: 'Agosto 2026 | 5 min de lectura',
    content: `
      <p>La adopción de tecnologías emergentes y herramientas de Inteligencia Artificial generativa (como ChatGPT, Gemini y Midjourney) ha dejado de ser una ventaja opcional para convertirse en el pilar central de la competitividad comercial moderna.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">1. Personalización de Servicios a Gran Escala</h4>
      <p>El verdadero valor de la IA no reside en la automatización ciega, sino en la capacidad de estructurar y analizar patrones de comportamiento de los usuarios (a través de analítica avanzada como GA4) para personalizar ofertas, contenidos y recomendaciones en tiempo real.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">2. Uso Ético y Responsable de los Datos</h4>
      <p>En mi trayectoria como docente e instructor en asignaturas de IA generativa, enfatizo la importancia del marco ético. Las empresas que prioricen la transparencia y el tratamiento ético del dato generarán mayor confianza y lealtad de marca a largo plazo.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">3. Hoja de Ruta para la Integración</h4>
      <p>Para implementar IA generativa en marketing se requiere: auditoría de procesos comerciales existentes, capacitación transversal del equipo y la adopción de plataformas interconectadas mediante CRM (como HubSpot y Mailchimp).</p>
    `
  },
  2: {
    category: 'Transformación Digital',
    title: 'Evaluación de Madurez Digital: Guía para diagnosticar brechas en PyMEs',
    date: 'Julio 2026 | 6 min de lectura',
    content: `
      <p>Evaluar la madurez digital de una empresa implica analizar no solo la tecnología adoptada, sino la cultura organizacional, los modelos de negocio y la consistencia en la Experiencia de Usuario (UX).</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">Los 7 Pilares de la Experiencia de Usuario (UX)</h4>
      <p>Aplicando metodologías como Design Thinking y herramientas colaborativas (Miro, Trello), identificamos si la plataforma comercial es útil, deseable, accesible, utilizable, valiosa y confiable.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">De la Auditoría a la Rentabilidad</h4>
      <p>Diagnosticar brechas tecnológicas permite rediseñar la estrategia de posicionamiento comercial, optimizar presupuestos y aumentar la tasa de conversión en plataformas e-commerce (Shopify, WooCommerce, Wix).</p>
    `
  },
  3: {
    category: 'Innovación Académica',
    title: 'Formando las Competencias Digitales del Futuro: Caso AIEP 2026',
    date: 'Junio 2026 | 4 min de lectura',
    content: `
      <p>Reconocido entre los "20 Docentes Innovadores 2026" a nivel institucional en AIEP, comparto la visión detrás de la integración transversal del marketing digital y la ciencia de datos en la educación superior.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">Proyectos Prácticos y Marketplaces Reales</h4>
      <p>Guíar a más de 80 estudiantes y emprendedores ha demostrado que el aprendizaje más efectivo ocurre al construir soluciones del mundo real, como la implementación de marketplaces digitales que conectan talento con el ecosistema productivo.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">Vinculación con el Medio y Exportación</h4>
      <p>Como mentor certificado en Mentor Crew (Perú 2023) y MoveIncuba, el objetivo es preparar profesionales capaces de diagnosticar necesidades del mercado global e innovar con transferencia tecnológica continua.</p>
    `
  }
};

function initArticleModals() {
  const articleModal = document.getElementById('article-modal');
  const articleCloseBtn = document.getElementById('article-modal-close');
  const articleCtaBtn = document.getElementById('article-cta-btn');

  if (!articleModal || !articleCloseBtn) return;

  document.querySelectorAll('.open-article-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = btn.getAttribute('data-article');
      const data = articleDetailsData[articleId];

      if (data) {
        document.getElementById('article-cat').textContent = data.category;
        document.getElementById('article-title').textContent = data.title;
        document.getElementById('article-meta').textContent = `Por Luis González Monroy | ${data.date}`;
        document.getElementById('article-body').innerHTML = data.content;

        articleModal.classList.add('active');
      }
    });
  });

  articleCloseBtn.addEventListener('click', () => {
    articleModal.classList.remove('active');
  });

  if (articleCtaBtn) {
    articleCtaBtn.addEventListener('click', () => {
      articleModal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === articleModal) {
      articleModal.classList.remove('active');
    }
  });
}

/* 7. ANIMACIÓN DE BARRAS DE HABILIDADES AL HACER SCROLL */
function initSkillBars() {
  const skillSection = document.getElementById('habilidades');
  const progressBars = document.querySelectorAll('.skill-progress');

  if (!skillSection || progressBars.length === 0) return;

  let animated = false;

  window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth;
      });
      animated = true;
    }
  });
}

/* 8. FORMULARIO DE CONTACTO CON ENVÍO REAL Y NOTIFICACIÓN TOAST */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData
      });

      const resData = await response.json();

      if (resData.success) {
        showToast(`¡Gracias ${name}! El correo se ha enviado exitosamente a l.gonzalez8035@gmail.com.`);
        contactForm.reset();
      } else {
        // En caso de faltar activar la clave gratuita, abre la aplicación de correo para garantizar la entrega
        window.location.href = `mailto:l.gonzalez8035@gmail.com?subject=Mensaje%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nDe: ' + email)}`;
        showToast(`Abriendo tu aplicación de correo para enviar la consulta.`);
      }
    } catch (err) {
      window.location.href = `mailto:l.gonzalez8035@gmail.com?subject=Mensaje%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nDe: ' + email)}`;
      showToast(`Abriendo tu cliente de correo para enviar la consulta.`);
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* 9. DESCARGAR / IMPRIMIR CV */
function downloadCV() {
  window.print();
}
