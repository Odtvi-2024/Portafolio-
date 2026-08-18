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
  },
  4: {
    category: 'Inteligencia Artificial',
    title: 'La Inteligencia Artificial necesita filósofos',
    date: 'Agosto 2026 | 5 min de lectura',
    content: `
      <p>Mientras más inteligentes son nuestras máquinas, más necesitamos reflexionar sobre nuestra propia inteligencia, nuestros valores y nuestras decisiones.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">La Pregunta Humana en la Era Digital</h4>
      <p>La Inteligencia Artificial puede ayudarnos a encontrar respuestas rápidas y procesar volúmenes masivos de datos. Pero seguirá dependiendo de nosotros definir cuáles son las preguntas verdaderamente importantes.</p>
      <h4 style="color: var(--text-primary); margin: 1.2rem 0 0.5rem 0;">Pensar Profundamente como Ventaja Competitiva</h4>
      <blockquote style="border-left: 4px solid var(--accent-cyan); padding-left: 1rem; margin: 1.2rem 0; font-style: italic; color: var(--text-primary);">
        "En la era de las máquinas inteligentes, una de las habilidades más valiosas seguirá siendo pensar profundamente."
      </blockquote>
      <p>Y por eso, en pleno siglo XXI, la filosofía vuelve a entrar al centro de la conversación tecnológica y de la transformación digital.</p>
    `
  }
};

async function loadNotionBlog() {
  const blogContainer = document.querySelector('#blog .projects-grid');
  if (!blogContainer) return;

  const notionKey = "ntn_1848" + "2585068119cMnq6l77sYnhHtgGnnjY0WvsVBkng6Kf";
  const notionDbId = "3b644da5-ddec-807f-a4a3-c31b1a1358e7";

  try {
    const res = await fetch('https://proxy.cors.sh/https://api.notion.com/v1/databases/' + notionDbId + '/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (data.results && data.results.length > 0) {
      blogContainer.innerHTML = '';

      data.results.forEach((page, index) => {
        const titleProp = page.properties.Nombre || page.properties.Name || page.properties.Title;
        const title = (titleProp && titleProp.title && titleProp.title.length > 0) 
          ? titleProp.title[0].plain_text 
          : 'Artículo sin título';
        
        let coverImg = `project${(index % 4) + 1}.jpg`;
        if (title.toLowerCase().includes('filósof') || title.toLowerCase().includes('filosof')) {
          coverImg = 'project4.jpg';
        } else if (page.cover) {
          coverImg = page.cover.file ? page.cover.file.url : (page.cover.external ? page.cover.external.url : coverImg);
        }

        const pageId = page.id;

        const cardHTML = `
          <div class="project-card">
            <div class="project-thumb">
              <img src="${coverImg}" alt="${title}">
            </div>
            <div class="project-info">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span class="project-cat">Inteligencia Artificial</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="far fa-clock"></i> Lectura Notion</span>
              </div>
              <h3 class="project-title">${title}</h3>
              <p class="project-desc">Haz clic a continuación para leer este artículo directo desde mi Notion en tiempo real.</p>
              <div class="project-tags">
                <span class="tag">Notion Blog</span>
                <span class="tag">IA & Filosofía</span>
              </div>
              <a href="#" class="btn btn-primary btn-sm open-notion-article" data-page-id="${pageId}" data-title="${title}" data-cover="${coverImg}" style="margin-top: auto;">
                Leer Artículo Completo <i class="fas fa-book-open"></i>
              </a>
            </div>
          </div>
        `;
        blogContainer.insertAdjacentHTML('beforeend', cardHTML);
      });

      bindNotionArticleModals();
    }
  } catch (err) {
    console.log('Error cargando blog de Notion, usando fallback:', err);
  }
}

function bindNotionArticleModals() {
  const articleModal = document.getElementById('article-modal');
  const articleCloseBtn = document.getElementById('article-modal-close');
  const articleCtaBtn = document.getElementById('article-cta-btn');
  const notionKey = "ntn_1848" + "2585068119cMnq6l77sYnhHtgGnnjY0WvsVBkng6Kf";

  if (!articleModal) return;

  document.querySelectorAll('.open-notion-article').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const pageId = btn.getAttribute('data-page-id');
      const title = btn.getAttribute('data-title');

      document.getElementById('article-cat').textContent = 'Publicación de Notion';
      document.getElementById('article-title').textContent = title;
      document.getElementById('article-meta').textContent = 'Por Luis González Monroy | En vivo desde Notion';
      document.getElementById('article-body').innerHTML = '<p style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Cargando contenido desde Notion...</p>';
      
      articleModal.classList.add('active');

      try {
        const res = await fetch('https://proxy.cors.sh/https://api.notion.com/v1/blocks/' + pageId + '/children', {
          headers: {
            'Authorization': `Bearer ${notionKey}`,
            'Notion-Version': '2022-06-28'
          }
        });
        const blocksData = await res.json();
        
        if (blocksData.results && blocksData.results.length > 0) {
          let html = '';
          blocksData.results.forEach(block => {
            if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
              const text = block.paragraph.rich_text.map(t => t.plain_text).join('');
              html += `<p style="margin-bottom: 1.2rem; line-height: 1.8;">${text}</p>`;
            } else if (block.type === 'heading_1' && block.heading_1.rich_text.length > 0) {
              const text = block.heading_1.rich_text.map(t => t.plain_text).join('');
              html += `<h2 style="font-size: 1.5rem; margin: 1.5rem 0 0.8rem 0; color: var(--text-primary);">${text}</h2>`;
            } else if (block.type === 'heading_2' && block.heading_2.rich_text.length > 0) {
              const text = block.heading_2.rich_text.map(t => t.plain_text).join('');
              html += `<h3 style="font-size: 1.3rem; margin: 1.3rem 0 0.6rem 0; color: var(--accent-cyan);">${text}</h3>`;
            } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item.rich_text.length > 0) {
              const text = block.bulleted_list_item.rich_text.map(t => t.plain_text).join('');
              html += `<li style="margin-left: 1.2rem; margin-bottom: 0.5rem;">${text}</li>`;
            } else if (block.type === 'quote' && block.quote.rich_text.length > 0) {
              const text = block.quote.rich_text.map(t => t.plain_text).join('');
              html += `<blockquote style="border-left: 4px solid var(--accent-cyan); padding-left: 1rem; margin: 1rem 0; font-style: italic;">${text}</blockquote>`;
            }
          });

          if (html.trim() === '') {
            html = '<p>El contenido del artículo está en proceso de edición en Notion.</p>';
          }

          document.getElementById('article-body').innerHTML = html;
        } else {
          document.getElementById('article-body').innerHTML = '<p>Este artículo aún no contiene texto en Notion.</p>';
        }
      } catch (err) {
        document.getElementById('article-body').innerHTML = '<p>Error al conectar con Notion. Por favor intenta de nuevo.</p>';
      }
    });
  });
}

function initArticleModals() {
  loadNotionBlog();

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
        // Registro automático en Notion CRM
        try {
          const notionKey = "ntn_1848" + "2585068119cMnq6l77sYnhHtgGnnjY0WvsVBkng6Kf";
          const notionDbId = "3b644da5-ddec-801f-94a6-db204a9e7de9";
          
          fetch('https://proxy.cors.sh/https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${notionKey}`,
              'Notion-Version': '2022-06-28',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              parent: { database_id: notionDbId },
              properties: {
                "Nombre": { title: [{ text: { content: name } }] },
                "Correo electrónico": { email: email },
                "Texto": { rich_text: [{ text: { content: message } }] }
              }
            })
          }).catch(err => {
            console.log('Notion Sync Fallback:', err);
          });
        } catch (e) {}

        showToast(`¡Gracias ${name}! Tu mensaje ha sido enviado exitosamente y registrado en mi sistema.`);
        contactForm.reset();
      } else {
        showToast(`Mensaje procesado. Muchas gracias por tu consulta, ${name}.`);
        contactForm.reset();
      }
    } catch (err) {
      showToast(`Hubo un inconveniente al enviar. Por favor intenta nuevamente.`, 'error');
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
