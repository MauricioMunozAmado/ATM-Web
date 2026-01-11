// Elementos del DOM
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const allLinks = document.querySelectorAll('.nav-links a, .mobile-link');
const navbar = document.querySelector('.navbar');

// Toggle del menú móvil
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Efecto de scroll - cambiar apariencia del navbar
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.3)';
    }
});

// Resaltar enlace activo según la sección visible
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    allLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('.submit-btn');
        const buttonText = submitButton.querySelector('span:first-child');
        const originalText = buttonText.textContent;

        // Deshabilitar botón
        submitButton.disabled = true;
        buttonText.textContent = 'Enviando...';

        // Obtener datos del formulario
        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showMessage('✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Error en el envío');
            }
        } catch (error) {
            showMessage('❌ Error al enviar. Verifica tu ACCESS KEY o intenta nuevamente.', 'error');
            console.error('Error:', error);
        } finally {
            submitButton.disabled = false;
            buttonText.textContent = originalText;
        }
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 6000);

    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}







// ==========================================
// FUNCIONALIDAD CENTRO DE APRENDIZAJE
// ==========================================

// Filtrado de capacitaciones por tipo
const tabButtons = document.querySelectorAll('.tab-button');
const trainingCards = document.querySelectorAll('.training-card');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover active de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Agregar active al botón clickeado
            this.classList.add('active');

            // Obtener el filtro seleccionado
            const filter = this.getAttribute('data-filter');

            // Filtrar las tarjetas
            trainingCards.forEach(card => {
                const cardType = card.getAttribute('data-type');

                if (filter === 'all' || cardType === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ==========================================
// FUNCIONALIDAD INDUCCIONES
// ==========================================

// Función para ver inducción (abrir PDF en nueva ventana)
function viewInduction(filename) {
    const pdfPath = `docs/${filename}`;

    // Verificar si el archivo existe (esto es una simulación)
    // En producción, el navegador manejará si el archivo existe o no
    window.open(pdfPath, '_blank');
}

// ==========================================
// ANIMACIONES AL HACER SCROLL
// ==========================================

// Detectar cuando las secciones entran en el viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: Dejar de observar una vez que ya apareció
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observar las tarjetas de políticas
const policyCards = document.querySelectorAll('.policy-card');
policyCards.forEach(card => observer.observe(card));

// Observar las tarjetas de capacitaciones
const allTrainingCards = document.querySelectorAll('.training-card');
allTrainingCards.forEach(card => observer.observe(card));

// Observar los items de inducción
const inductionItems = document.querySelectorAll('.induction-item');
inductionItems.forEach(item => observer.observe(item));

// ==========================================
// CONTADOR DE RECURSOS (OPCIONAL)
// ==========================================

// Contar y mostrar la cantidad de recursos por tipo
function updateResourceCount() {
    const videos = document.querySelectorAll('[data-type="video"]').length;
    const pdfs = document.querySelectorAll('[data-type="pdf"]').length;
    const ppts = document.querySelectorAll('[data-type="ppt"]').length;
    const total = videos + pdfs + ppts;

    console.log(`Total de recursos: ${total}`);
    console.log(`Videos: ${videos}, PDFs: ${pdfs}, Presentaciones: ${ppts}`);
}

// Ejecutar al cargar la página
if (document.querySelector('.training-section')) {
    updateResourceCount();
}

// ==========================================
// FUNCIONALIDAD DE MODALES DE SERVICIOS
// ==========================================

const serviceModal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalHeader = document.querySelector('.modal-header');
const closeModalBtn = document.querySelector('.close-modal');
const serviceCards = document.querySelectorAll('.card[data-service]');

// Datos de los servicios
const servicesData = {
    'vigilancia-fija': {
        title: 'Vigilancia Fija',
        description: 'Ofrecemos servicios de vigilancia física fija con personal altamente calificado y rigurosamente seleccionado. Nuestros guardias están entrenados en control de accesos, prevención de pérdidas, atención al cliente y respuesta ante emergencias. Ideal para conjuntos residenciales, edificios corporativos, plantas industriales y centros comerciales. Garantizamos presencia las 24 horas del día, los 7 días de la semana, adaptándonos a los protocolos específicos de seguridad de su instalación.',
        image: 'images/vigilancia-fija.jpg'
    },
    'vigilancia-movil': {
        title: 'Vigilancia Móvil',
        description: 'Nuestro servicio de vigilancia móvil complementa la seguridad estática mediante patrullajes aleatorios o programados. Contamos con vehículos y motocicletas equipados con GPS y comunicación directa con nuestra central de operaciones. Este servicio es perfecto para grandes perímetros, zonas industriales, o clústeres empresariales que requieren una supervisión dinámica para disuadir actividades sospechosas y verificar el estado de las instalaciones.',
        image: 'images/vigilancia-movil.jpg'
    },
    'tecnologia': {
        title: 'Tecnología en Seguridad',
        description: 'Integramos soluciones tecnológicas de vanguardia para potenciar su esquema de seguridad. Instalación y monitoreo de circuitos cerrados de televisión (CCTV) con analítica de vídeo, controles de acceso biométricos, sistemas de alarma contra intrusión y detección de incendios. Nuestra central de monitoreo opera 24/7 para gestionar alertas en tiempo real y coordinar respuestas inmediatas con las autoridades competentes.',
        image: 'images/tecnologia.jpg'
    },
    'escolta': {
        title: 'Servicio de Escolta',
        description: 'Brindamos protección personalizada a ejecutivos, dignatarios y carga crítica. Nuestro personal de escoltas cuenta con capacitación avanzada en manejo defensivo y evasivo, defensa personal y uso de armas. Planificamos rutas seguras y realizamos avanzadas para minimizar riesgos durante los desplazamientos. Ya sea protección a personas o acompañamiento de mercancías valiosas, su seguridad es nuestra prioridad absoluta.',
        image: 'images/escolta.jpg'
    }
};

// Función para abrir el modal
function openModal(serviceKey) {
    const service = servicesData[serviceKey];
    if (!service) return;

    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;

    // Cambiar imagen de fondo del CONTENEDOR PRINCIPAL del modal
    const modalContent = serviceModal.querySelector('.modal-content');
    modalContent.style.backgroundImage = `url('${service.image}')`;

    serviceModal.style.display = 'block';

    // Pequeño delay para permitir que la transición de opacidad ocurra
    setTimeout(() => {
        serviceModal.classList.add('show');
    }, 10);

    // Evitar scroll en el body
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
    serviceModal.classList.remove('show');

    setTimeout(() => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll
        // Limpiar imagen de fondo al cerrar para evitar parpadeos al reabrir
        serviceModal.querySelector('.modal-content').style.backgroundImage = 'none';
    }, 300); // Esperar a que termine la transición
}

// Event Listeners
if (serviceModal) {
    // Click en las tarjetas
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            openModal(serviceKey);
        });
    });

    // Click en botón de cerrar
    closeModalBtn.addEventListener('click', closeModal);

    // Click fuera del contenido (cerrar)
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModal.style.display === 'block') {
            closeModal();
        }
    });
}
