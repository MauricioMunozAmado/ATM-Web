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


<<<<<<< HEAD
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
=======
>>>>>>> 8131cdf (Actualización del proyecto)


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
<<<<<<< HEAD
const closeModalBtn = document.querySelector('.close-modal');
const serviceCards = document.querySelectorAll('.card[data-service]');

// Datos de los servicios
=======
const serviceCards = document.querySelectorAll('.card[data-service]');

// Datos de los servicios
// Datos de los servicios - ACTUALIZADOS
>>>>>>> 8131cdf (Actualización del proyecto)
const servicesData = {
    'vigilancia-fija': {
        title: 'Vigilancia Fija',
        description: 'Ofrecemos servicios de vigilancia física fija con personal altamente calificado y rigurosamente seleccionado. Nuestros guardias están entrenados en control de accesos, prevención de pérdidas, atención al cliente y respuesta ante emergencias. Ideal para conjuntos residenciales, edificios corporativos, plantas industriales y centros comerciales. Garantizamos presencia las 24 horas del día, los 7 días de la semana, adaptándonos a los protocolos específicos de seguridad de su instalación.',
<<<<<<< HEAD
        image: 'images/vigilancia-fija.jpg'
=======
        image: 'images/01 Vigilancia Fija.png',
        pdf: 'docs/portafolio-vigilancia-fija.pdf' // Placeholder
>>>>>>> 8131cdf (Actualización del proyecto)
    },
    'vigilancia-movil': {
        title: 'Vigilancia Móvil',
        description: 'Nuestro servicio de vigilancia móvil complementa la seguridad estática mediante patrullajes aleatorios o programados. Contamos con vehículos y motocicletas equipados con GPS y comunicación directa con nuestra central de operaciones. Este servicio es perfecto para grandes perímetros, zonas industriales, o clústeres empresariales que requieren una supervisión dinámica para disuadir actividades sospechosas y verificar el estado de las instalaciones.',
<<<<<<< HEAD
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
=======
        image: 'images/02 Vigilancia Movil.png',
        pdf: 'docs/portafolio-vigilancia-movil.pdf'
    },
    'seguridad-electronica': { /* Key updated to match HTML */
        title: 'Seguridad Electrónica',
        description: 'Integramos soluciones tecnológicas de vanguardia para potenciar su esquema de seguridad. Instalación y monitoreo de circuitos cerrados de televisión (CCTV) con analítica de vídeo, controles de acceso biométricos, sistemas de alarma contra intrusión y detección de incendios. Nuestra central de monitoreo opera 24/7 para gestionar alertas en tiempo real y coordinar respuestas inmediatas con las autoridades competentes.',
        image: 'images/03 Seguridad electronica.png',
        pdf: 'docs/portafolio-seguridad-electronica.pdf'
    },
    'escolta': {
        title: 'Escolta de Personas y Mercancías',
        description: 'Brindamos protección personalizada a ejecutivos, dignatarios y carga crítica. Nuestro personal de escoltas cuenta con capacitación avanzada en manejo defensivo y evasivo, defensa personal y uso de armas. Planificamos rutas seguras y realizamos avanzadas para minimizar riesgos durante los desplazamientos. Ya sea protección a personas o acompañamiento de mercancías valiosas, su seguridad es nuestra prioridad absoluta.',
        image: 'images/04 Escolta de personas y mercancias.png',
        pdf: 'docs/portafolio-escolta.pdf'
    },
    'cctv': {
        title: 'Monitoreo 24/7',
        description: 'Sistemas profesionales de Circuito Cerrado de Televisión para monitoreo constante. Implementamos cámaras de alta definición, visión nocturna, y acceso remoto para que pueda supervisar sus instalaciones desde cualquier lugar. Soluciones escalables para hogares, negocios y grandes superficies.',
        image: 'images/05 CCTV.png',
        pdf: 'docs/portafolio-cctv.pdf'
    }
};

// Función para abrir el modal - ACTUALIZADA
function openServiceModal(serviceKey) {
    const serviceModal = document.getElementById('serviceModal');
    const modalContent = serviceModal.querySelector('.modal-content');

    const service = servicesData[serviceKey];
    if (!service) return;

    // Reconstruir contenido del modal dinámicamente - IMAGEN IZQUIERDA, TEXTO DERECHA
    modalContent.innerHTML = `
        <div class="modal-left">
            <img src="${service.image}" alt="${service.title}">
        </div>
        <div class="modal-right">
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <div class="pdf-download-footer">
                <a href="${service.pdf}" class="pdf-link-container" target="_blank">
                    <span class="pdf-text">Descargar PDF de Servicio</span>
                    <div class="pdf-arrow-line"></div>
                    <i class="far fa-eye pdf-eye-icon"></i>
                </a>
            </div>
        </div>
        <span class="close-modal">&times;</span>
    `;

    // Re-attach close event listener since we overwrote the HTML
    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);

    serviceModal.classList.add('active');
>>>>>>> 8131cdf (Actualización del proyecto)
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
<<<<<<< HEAD
    serviceModal.classList.remove('show');

    setTimeout(() => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll
        // Limpiar imagen de fondo al cerrar para evitar parpadeos al reabrir
        serviceModal.querySelector('.modal-content').style.backgroundImage = 'none';
    }, 300); // Esperar a que termine la transición
=======
    if (!serviceModal) return;
    serviceModal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
>>>>>>> 8131cdf (Actualización del proyecto)
}

// Event Listeners
if (serviceModal) {
    // Click en las tarjetas
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
<<<<<<< HEAD
            openModal(serviceKey);
        });
    });

    // Click en botón de cerrar
    closeModalBtn.addEventListener('click', closeModal);

=======
            openServiceModal(serviceKey);
        });
    });

>>>>>>> 8131cdf (Actualización del proyecto)
    // Click fuera del contenido (cerrar)
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
<<<<<<< HEAD
        if (e.key === 'Escape' && serviceModal.style.display === 'block') {
=======
        if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
>>>>>>> 8131cdf (Actualización del proyecto)
            closeModal();
        }
    });
}

// ==========================================
// FUNCIONALIDAD GALERIA (BENEFICIOS)
// ==========================================

const galleryModal = document.getElementById('galleryModal');
<<<<<<< HEAD
const closeGalleryBtn = document.querySelector('.close-modal'); // Generic selector if inside modal
=======
const closeGalleryBtn = document.querySelector('#galleryModal .close-modal');
>>>>>>> 8131cdf (Actualización del proyecto)
const imageUpload = document.getElementById('imageUpload');
const galleryDisplay = document.getElementById('galleryDisplay');
const galleryTitle = document.getElementById('galleryTitle');

// Ensure the function is globally available
window.openGalleryModal = function (eventId) {
    if (!galleryModal) return;

    // Actualizar Título
    const eventName = eventId.replace('evento', 'Evento ');
    if (galleryTitle) galleryTitle.textContent = `Galería: ${eventName}`;

    // Limpiar display
    if (galleryDisplay) {
        galleryDisplay.innerHTML = '';

        // Simular carga de "imágenes ilimitadas" (o muchas imágenes)
<<<<<<< HEAD
        // Cargamos 12 imágenes de muestra
=======
>>>>>>> 8131cdf (Actualización del proyecto)
        const sampleImages = [
            'images/vigilancia-fija.jpg',
            'images/vigilancia-movil.jpg',
            'images/tecnologia.jpg',
            'images/escolta.jpg',
            'images/vigilancia-fija.jpg',
            'images/vigilancia-movil.jpg',
            'images/tecnologia.jpg',
            'images/escolta.jpg',
            'images/vigilancia-fija.jpg',
            'images/vigilancia-movil.jpg',
            'images/tecnologia.jpg',
            'images/escolta.jpg'
        ];

        sampleImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Foto ${index + 1}`;
            img.className = 'gallery-thumb';
<<<<<<< HEAD
            // Añadir click para ver en grande (opcional)
=======
>>>>>>> 8131cdf (Actualización del proyecto)
            img.onclick = () => window.open(src, '_blank');
            galleryDisplay.appendChild(img);
        });
    }

<<<<<<< HEAD
    galleryModal.style.display = 'block';

    // Smooth fade in
    setTimeout(() => {
        galleryModal.classList.add('show');
    }, 10);

=======
    galleryModal.classList.add('active');
>>>>>>> 8131cdf (Actualización del proyecto)
    document.body.style.overflow = 'hidden';
};

// Función para cerrar la galería
function closeGalleryModal() {
    if (!galleryModal) return;
<<<<<<< HEAD

    galleryModal.classList.remove('show');
    setTimeout(() => {
        galleryModal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Event listeners para cerrar
=======
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners para cerrar galería
>>>>>>> 8131cdf (Actualización del proyecto)
if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener('click', closeGalleryModal);
}

if (galleryModal) {
    window.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });

    document.addEventListener('keydown', (e) => {
<<<<<<< HEAD
        if (e.key === 'Escape' && galleryModal.style.display === 'block') {
=======
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
>>>>>>> 8131cdf (Actualización del proyecto)
            closeGalleryModal();
        }
    });
}

<<<<<<< HEAD
// Funcionalidad de subir imágenes (Simulación en cliente)
=======
// ---------------------------------------------------------------------------
// TRABAJA CON NOSOTROS - FILE INPUT HANDLING
// ---------------------------------------------------------------------------
const cvInput = document.getElementById('cv_upload');
const fileStatus = document.getElementById('file-chosen');

if (cvInput) {
    cvInput.addEventListener('change', function () {
        if (this.files && this.files.length > 0) {
            fileStatus.textContent = this.files[0].name;
            fileStatus.style.color = "#ffd700";
        } else {
            fileStatus.textContent = "Ningún archivo seleccionado";
            fileStatus.style.color = "#4a5568";
        }
    });
}
>>>>>>> 8131cdf (Actualización del proyecto)
if (imageUpload && galleryDisplay) {
    imageUpload.addEventListener('change', function (e) {
        const files = e.target.files;

        if (files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'gallery-thumb';
                    img.onclick = function () {
                        window.open(this.src, '_blank');
                    };
<<<<<<< HEAD
                    // Prepend to show new images first
=======
>>>>>>> 8131cdf (Actualización del proyecto)
                    galleryDisplay.prepend(img);
                };

                reader.readAsDataURL(file);
            });
        }
    });
}

<<<<<<< HEAD

// ========================================
// INICIALIZACIÓN - Se ejecuta cuando el DOM está listo
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initMenuToggle();
    initCardClickHandlers();
    initModalHandlers();
    initFormHandler();
    initSmoothScroll();
    initParallaxEffect();
    initCounters();
    initMapPopups();
});

// ========================================
// MINI-MODALS MAPA (COBERTURA)
// ========================================

function initMapPopups() {
    const markers = document.querySelectorAll('.marker');

    markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
            // Eliminar popups anteriores
            const activePopup = document.querySelector('.marker-popup');
            if (activePopup) activePopup.remove();

            // Crear el mini-modal
            const locality = marker.getAttribute('data-locality');
            const popup = document.createElement('div');
            popup.className = 'marker-popup animate-fade';
            popup.innerText = locality;

            marker.appendChild(popup);

            // Cerrar automáticamente tras 2 segundos
            setTimeout(() => {
                if (popup && popup.parentNode) popup.remove();
            }, 2000);
        });
    });
}
// ========================================
// ANIMACIÓN DE CONTADORES (INDICADORES)
// ========================================

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Cuanto más bajo, más rápido

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const currentText = counter.innerText;

            // Extraer solo el número
            const count = +currentText.replace(/[^0-9]/g, '');
            const increment = target / speed;

            if (count < target) {
                const nextValue = Math.ceil(count + increment);

                // Formatear según el tipo
                if (currentText.includes('+')) {
                    counter.innerText = `+${nextValue}`;
                } else if (currentText.includes('/')) {
                    counter.innerText = `${nextValue}/7`;
                } else if (currentText.includes('%')) {
                    counter.innerText = `${nextValue}%`;
                } else {
                    counter.innerText = nextValue;
                }

                setTimeout(updateCount, 10);
            } else {
                // Asegurar el valor final exacto
                if (currentText.includes('+')) {
                    counter.innerText = `+${target}`;
                } else if (currentText.includes('/')) {
                    counter.innerText = `${target}/7`;
                } else if (currentText.includes('%')) {
                    counter.innerText = `${target}%`;
=======
// ==========================================
// ANIMACIÓN DE CONTADORES (INDICADORES)
// ==========================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Cuanto más alto, más lento

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/[^0-9]/g, '');

            // Calcular el incremento
            const inc = target / speed;

            if (count < target) {
                // Añadir incremento y redondear
                const nextCount = Math.ceil(count + inc);

                // Preservar formato (prefijos/sufijos)
                if (counter.innerText.includes('+')) {
                    counter.innerText = `+${nextCount}`;
                } else if (counter.innerText.includes('%')) {
                    counter.innerText = `${nextCount}%`;
                } else if (counter.innerText.includes('/7')) {
                    counter.innerText = `${nextCount}/7`;
                } else {
                    counter.innerText = nextCount;
                }

                setTimeout(updateCount, 1);
            } else {
                // Asegurar que quede el valor exacto al final
                if (counter.innerText.includes('+')) {
                    counter.innerText = `+${target}`;
                } else if (counter.innerText.includes('%')) {
                    counter.innerText = `${target}%`;
                } else if (counter.innerText.includes('/7')) {
                    counter.innerText = `${target}/7`;
>>>>>>> 8131cdf (Actualización del proyecto)
                } else {
                    counter.innerText = target;
                }
            }
        };

<<<<<<< HEAD
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                counterObserver.unobserve(entry.target); // Solo animar una vez
=======
        // Reset inicial a 0 manteniendo el formato
        if (counter.innerText.includes('+')) {
            counter.innerText = '+0';
        } else if (counter.innerText.includes('%')) {
            counter.innerText = '0%';
        } else if (counter.innerText.includes('/7')) {
            counter.innerText = '0/7';
        } else {
            counter.innerText = '0';
        }

        updateCount();
    });
}

// Observer para activar los contadores cuando sean visibles
const statsSection = document.querySelector('.stats-panel');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target); // Solo animar una vez
>>>>>>> 8131cdf (Actualización del proyecto)
            }
        });
    }, { threshold: 0.5 });

<<<<<<< HEAD
    counters.forEach(counter => counterObserver.observe(counter));
}

// ========================================
// MENÚ HAMBURGUESA - MOBILE
// ========================================

function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ========================================
// MANEJO DE CARDS - ABRIR MODAL
// ========================================

function initCardClickHandlers() {
    const cards = document.querySelectorAll('.card');
    const serviceModal = document.getElementById('serviceModal');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const serviceType = this.getAttribute('data-service');
            openServiceModal(serviceType);
        });
    });
}

function openServiceModal(serviceType) {
    const serviceModal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    const services = {
        'vigilancia-fija': {
            title: 'Vigilancia Fija',
            description: 'Nuestro servicio de vigilancia fija ofrece protección constante con personal altamente capacitado. Disponible 24/7 para garantizar la seguridad de tus instalaciones.'
        },
        'vigilancia-movil': {
            title: 'Vigilancia Móvil',
            description: 'Patrullaje y monitoreo dinámico de áreas extensas. Nuestros equipos móviles proporcionan una cobertura completa y respuesta rápida ante cualquier incidente.'
        },
        'tecnologia': {
            title: 'Seguridad Electrónica',
            description: 'Sistemas avanzados de videovigilancia y control. Contamos con tecnología de punta para monitoreo en tiempo real y almacenamiento seguro de datos.'
        },
        'escolta': {
            title: 'Escolta y Protección',
            description: 'Protección personalizada para personas y mercancías. Nuestros escoltas están entrenados para garantizar tu seguridad en cualquier circunstancia.'
        }
    };

    const service = services[serviceType] || {
        title: 'Servicio de Seguridad',
        description: 'Contáctanos para más información sobre nuestros servicios.'
    };

    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;
    serviceModal.classList.add('active');
}

// ========================================
// MANEJO DEL MODAL
// ========================================

function initModalHandlers() {
    const modal = document.getElementById('serviceModal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', function () {
            modal.classList.remove('active');
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.classList.remove('active');
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
}

// ========================================
// MANEJO DEL FORMULARIO
// ========================================

function initFormHandler() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }
}

function handleFormSubmit(form) {
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Cambiar texto del botón
    submitBtn.innerHTML = '<span>Enviando...</span>';
    submitBtn.disabled = true;

    // Simular envío (reemplazar con tu lógica real)
    setTimeout(() => {
        formMessage.textContent = '¡Gracias! Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto pronto.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');

        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Limpiar formulario
        form.reset();

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
    }, 1500);
}

// ========================================
// SCROLL SUAVE
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();

                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;

=======
    statsObserver.observe(statsSection);
}

// INICIALIZACIÓN - Se ejecuta cuando el DOM está listo
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ Script cargado correctamente - Atmósfera de Seguridad');
    // ... rest of the existing code

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
>>>>>>> 8131cdf (Actualización del proyecto)
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
<<<<<<< HEAD
}

// ========================================
// EFECTO PARALLAX EN BANNER
// ========================================

function initParallaxEffect() {
    const bannerImagen = document.querySelector('.banner-imagen');
    const bannerSection = document.querySelector('.banner-principal');

    if (!bannerImagen || !bannerSection) return;

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        const bannerTop = bannerSection.offsetTop;

        if (scrollY < bannerTop + 400) {
            bannerImagen.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}

// ========================================
// FUNCIONES UTILITARIAS
// ========================================

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar teléfono
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
}

// Función para hacer scroll a un elemento
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========================================
// DETECCIÓN DE VIEWPORT PARA RESPONSIVE
// ========================================

function detectViewport() {
    const width = window.innerWidth;
    let viewport = 'desktop';

    if (width < 640) {
        viewport = 'mobile';
    } else if (width < 1024) {
        viewport = 'tablet';
    }

    return viewport;
}

// Ejecutar función cuando cambia el tamaño de la ventana
window.addEventListener('resize', function () {
    const viewport = detectViewport();
    console.log('Viewport actual:', viewport);
});

// ========================================
// OBSERVER PARA ANIMACIONES AL SCROLL
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .banner-principal');
    animatedElements.forEach(el => observer.observe(el));
}

// Iniciar animaciones al scroll
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ========================================
// MANEJO DE ERRORES Y DEBUG
// ========================================

// Log cuando la página carga correctamente
console.log('✅ Script cargado correctamente - Atmósfera de Seguridad');

// Manejo de errores global
window.addEventListener('error', function (event) {
    console.error('❌ Error detectado:', event.error);
});

// ========================================
// FUNCIONES ADICIONALES PERSONALIZABLES
// ========================================

// Función para enviar datos a un servidor (reemplazar con tu endpoint real)
async function sendFormToServer(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        throw error;
    }
}

// Función para obtener datos dinámicamente
async function fetchServiceData(serviceId) {
    try {
        const response = await fetch(`/api/services/${serviceId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos del servicio:', error);
        return null;
    }
}

// ========================================
// EVENT LISTENERS GLOBALES
// ========================================

// Escuchar cambios en el modo oscuro (si lo tienes)
window.addEventListener('theme-change', function (event) {
    console.log('Tema cambiado a:', event.detail.theme);
});

// Detectar conexión a internet
window.addEventListener('online', function () {
    console.log('✅ Conexión restaurada');
});

window.addEventListener('offline', function () {
    console.log('⚠️ Sin conexión a internet');
});

// ========================================
// INICIALIZAR MENÚ AL CARGAR
// ========================================

console.log('Script cargado');

setTimeout(() => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    console.log('menuToggle:', menuToggle);
    console.log('mobileMenu:', mobileMenu);
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            console.log('¡Click funcionando!');
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        console.log('✅ Menú inicializado correctamente');
    } else {
        console.error('❌ Elementos no encontrados');
    }
}, 500);
=======

    // Handle Active Links and Navbar Shadow on Scroll
    const sections = document.querySelectorAll('.section, section[id]');
    const allLinks = document.querySelectorAll('.nav-links a, .mobile-link');
    const navbar = document.querySelector('.navbar');

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Navbar Shadow
        if (navbar) {
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.3)';
            }
        }

        // Active Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (currentScroll >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
});

// ==========================================
// FUNCIONALIDAD RECAPTCHA (VALIDACIÓN)
// ==========================================
// Nota: El renderizado explícito ahora está directamente en atencion-al-usuario.html
// para cumplir estrictamente con la documentación oficial de Google.


// Validación de formularios de Atención
document.addEventListener('DOMContentLoaded', () => {
    const atencionForms = document.querySelectorAll('.atencion-form');
    atencionForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let response = '';

            // Determinar qué captcha validar según el contenedor padre
            if (this.contains(document.getElementById('captcha-pqrsf'))) {
                response = grecaptcha.getResponse(captchaPqrsf);
            } else if (this.contains(document.getElementById('captcha-delator'))) {
                response = grecaptcha.getResponse(captchaDelator);
            }

            if (!response) {
                e.preventDefault();
                alert('Por favor, resuelve el CAPTCHA antes de enviar el formulario.');
            }
        });
    });

    // Toggle de Preguntas Frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Opcional: Cerrar otros antes de abrir este
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
});
>>>>>>> 8131cdf (Actualización del proyecto)
