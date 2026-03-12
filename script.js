// ===================================
// ELEMENTOS DEL DOM
// ===================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const allLinks = document.querySelectorAll('.nav-links a, .mobile-link');
const navbar = document.querySelector('.navbar');

// ===================================// NAVEGACIÓN Y MENÚ MÓVIL
// ===================================
// Toggle del menú móvil
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle && mobileMenu) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (menuToggle && mobileMenu && !menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// ===================================
// EFECTOS DE DESPLAZAMIENTO (NAVBAR Y ENLACE ACTIVO)
// ===================================
let isScrolling = false;
function handleScroll() {
    if (isScrolling) return;
    isScrolling = true;

    window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        // Efecto de sombra en navbar
        if (navbar) {
            navbar.style.boxShadow = currentScroll > 50
                ? '0 4px 20px rgba(0, 0, 0, 0.4)'
                : '0 2px 15px rgba(0, 0, 0, 0.3)';
        }

        // Resaltar enlace activo
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (currentScroll >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href !== '#' && (href === `#${current}` || (current === 'inicio' && href === 'index.html'))) {
                link.classList.add('active');
            }
        });

        isScrolling = false;
    });
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Smooth scroll para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Función para mostrar mensajes de formulario
const formMessage = document.getElementById('form-message');
function showMessage(message, type) {
    if (!formMessage) {
        alert(message); // fallback si no hay contenedor de mensaje
        return;
    }
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 6000);

    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================================// MODALES DE SERVICIOS
// ===================================
const servicesData = {
    'vigilancia-fija': {
        title: 'Vigilancia Fija',
        description: 'Ofrecemos servicios de vigilancia física fija con personal altamente calificado y rigurosamente seleccionado. Nuestros vigilantes están entrenados en control de accesos, prevención de pérdidas, atención al cliente y respuesta ante emergencias. Ideal para conjuntos residenciales, edificios corporativos, plantas industriales y centros comerciales.',
        image: 'images/01 Vigilancia Fijaa.png',
        pdf: 'docs/portafolio-vigilancia-fija.pdf'
    },
    'vigilancia-movil': {
        title: 'Vigilancia Móvil',
        description: 'Nuestro servicio de vigilancia móvil complementa la seguridad estática mediante patrullajes aleatorios o programados. Contamos con vehículos y motocicletas equipados con GPS y comunicación directa con nuestra central de operaciones.',
        image: 'images/02 Vigilancia Movil.png',
        pdf: 'docs/portafolio-vigilancia-movil.pdf'
    },
    'seguridad-electronica': {
        title: 'Seguridad Electrónica',
        description: 'Integramos soluciones tecnológicas de vanguardia para potenciar su esquema de seguridad. Instalación y monitoreo de circuitos cerrados de televisión (CCTV) con analítica de vídeo, controles de acceso biométricos y sistemas de alarma.',
        image: 'images/03 Seguridad electronica.png',
        pdf: 'docs/portafolio-seguridad-electronica.pdf'
    },
    'escolta': {
        title: 'Escolta de Personas y Mercancías',
        description: 'Brindamos protección personalizada a ejecutivos, dignatarios y carga crítica. Nuestro personal de escoltas cuenta con capacitación avanzada en manejo defensivo y evasivo, defensa personal y uso de armas.',
        image: 'images/04 Escolta de personas y mercancias.png',
        pdf: 'docs/portafolio-escolta.pdf'
    },
    'cctv': {
        title: 'Monitoreo 24/7',
        description: 'Sistemas profesionales de Circuito Cerrado de Televisión para monitoreo constante. Implementamos cámaras de alta definición, visión nocturna, y acceso remoto para que pueda supervisar sus instalaciones desde cualquier lugar.',
        image: 'images/05 CCTV.png',
        pdf: 'docs/portafolio-cctv.pdf'
    }
};

// Función genérica para modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleServiceModal(serviceKey) {
    const serviceModal = document.getElementById('serviceModal');
    const service = servicesData[serviceKey];
    if (!serviceModal || !service) return;

    const modalContent = serviceModal.querySelector('.modal-content');
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

    modalContent.querySelector('.close-modal').onclick = () => closeModal(serviceModal);
    openModal('serviceModal');
}

window.openServiceModal = handleServiceModal;

// Event listeners globales para cerrar modales
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) closeModal(e.target);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) closeModal(activeModal);
    }
});

// ===================================// GALERÍA (BENEFICIOS)
// ===================================
const galleryModal = document.getElementById('galleryModal');
const galleryDisplay = document.getElementById('galleryDisplay');
const galleryTitle = document.getElementById('galleryTitle');

window.openGalleryModal = function (eventId) {
    if (!galleryModal) return;
    const eventName = eventId.replace('evento', 'Evento ');
    if (galleryTitle) galleryTitle.textContent = `Galería: ${eventName}`;

    if (galleryDisplay) {
        galleryDisplay.innerHTML = '';
        const sampleImages = [
            'images/vigilancia-fija.jpg', 'images/vigilancia-movil.jpg',
            'images/tecnologia.jpg', 'images/escolta.jpg'
        ];

        sampleImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Foto ${index + 1}`;
            img.className = 'gallery-thumb';
            img.onclick = () => window.open(src, '_blank');
            galleryDisplay.appendChild(img);
        });
    }
    openModal('galleryModal');
};

const closeGalleryBtn = document.querySelector('#galleryModal .close-modal');
if (closeGalleryBtn) closeGalleryBtn.onclick = () => closeModal('galleryModal');


// ===================================// TRABAJA CON NOSOTROS (MANEJO DE ARCHIVOS)
// ===================================
const cvInput = document.getElementById('cv_upload');
const fileStatus = document.getElementById('file-chosen');

if (cvInput && fileStatus) {
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

// ===================================// ANIMACIÓN DE CONTADORES
// ===================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : '');
        let count = 0;
        const inc = target / 100;

        const update = () => {
            count += inc;
            if (count < target) {
                counter.innerText = (suffix === '+' ? '+' : '') + Math.floor(count) + (suffix === '%' ? '%' : '');
                requestAnimationFrame(update);
            } else {
                counter.innerText = (suffix === '+' ? '+' : '') + target + (suffix === '%' ? '%' : '');
            }
        };
        update();
    });
}

const statsSection = document.querySelector('.stats-panel');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

// ===================================// CONMUTADOR DE PREGUNTAS FRECUENTES (FAQ)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Inicializar scroll una vez cargado
    handleScroll();
});

// ===================================// OBSERVADOR DE ANIMACIÓN DE DESVANECIMIENTO (FADE-IN)
// ===================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(element => {
    fadeObserver.observe(element);
});

// ===================================
// GESTIÓN DE FORMULARIOS (ATENCIÓN AL USUARIO)
// ===================================
var recaptchaWidgets = {};

var onloadCallback = function () {
    console.log("reCAPTCHA API loading...");
    if (typeof grecaptcha !== 'undefined' && document.getElementById('captcha-pqrsf')) {
        recaptchaWidgets['pqrsf'] = grecaptcha.render('captcha-pqrsf', {
            'sitekey': '6LdAB4UsAAAAAH7L5LOtV_i1ajnYIrQLOwjx6xiI',
            'theme': 'light'
        });
    }
    if (typeof grecaptcha !== 'undefined' && document.getElementById('captcha-delator')) {
        recaptchaWidgets['delator'] = grecaptcha.render('captcha-delator', {
            'sitekey': '6LdAB4UsAAAAAH7L5LOtV_i1ajnYIrQLOwjx6xiI',
            'theme': 'light'
        });
    }
    console.log("reCAPTCHA widgets initialized.");
};
window.onloadCallback = onloadCallback;

// Manejo unificado de todos los formularios del sitio
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async function (e) {
        const isAtencionForm = form.classList.contains('atencion-form');
        const submitButton = form.querySelector('button[type="submit"], .atencion-btn, .submit-btn-yellow, .final-submit-btn');

        // Validación de reCAPTCHA para formularios de atención
        if (isAtencionForm) {
            const widgetId = (form.id === 'form-delator') ? recaptchaWidgets['delator'] : recaptchaWidgets['pqrsf'];
            const response = grecaptcha.getResponse(widgetId);

            if (!response) {
                e.preventDefault();
                alert('Por favor, completa el reCAPTCHA antes de enviar.');
                return;
            }
        }

        e.preventDefault(); // Prevenir envío nativo para usar AJAX

        if (submitButton) {
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Enviando...</span>';

            const formData = new FormData(form);
            const action = form.getAttribute('action');

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('✅ ¡Mensaje enviado exitosamente! Recuerda que si es la primera vez que usas este formulario con este correo, debes revisar tu bandeja de entrada y activar el formulario en el enlace que te envió FormSubmit.');
                    form.reset();
                    if (isAtencionForm) {
                        const widgetId = (form.id === 'form-delator') ? recaptchaWidgets['delator'] : recaptchaWidgets['pqrsf'];
                        grecaptcha.reset(widgetId);
                    }
                } else {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        const data = await response.json();
                        if (data.message) {
                            alert('❌ ' + data.message);
                        } else {
                            alert('❌ Error al enviar. Por favor intenta nuevamente.');
                        }
                    } else {
                        // Fallback para respuestas no JSON
                        alert('❌ Error al enviar (Status: ' + response.status + '). Por favor intenta nuevamente.');
                    }
                }
            } catch (error) {
                alert('❌ Error de conexión. Por favor revisa tu internet.');
                console.error('Error:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        }
    });
});

// ===================================
// LÓGICA DEL MODAL DE ATERA
// ===================================
// ===================================
// LÓGICA DEL MODAL DE ATERA
// ===================================
window.openAteraModal = function (event) {
    if (event) event.preventDefault();
    openModal('ateraModal');
};

window.closeAteraModal = () => closeModal('ateraModal');

// Agregar listeners automáticos
document.querySelectorAll('a').forEach(link => {
    if (link.textContent.trim() === 'Atera') {
        link.onclick = openAteraModal;
    }
});

console.log('✅ Script cargado y consolidado correctamente.');


