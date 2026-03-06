// ===================================
// ELEMENTOS DEL DOM
// ===================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const allLinks = document.querySelectorAll('.nav-links a, .mobile-link');
const navbar = document.querySelector('.navbar');

// ===================================
// NAVEGACIÓN Y MENÚ MÓVIL
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
// EFECTOS DE DESPLAZAMIENTO (SCROLL)
// ===================================
const sections = document.querySelectorAll('.section, section[id]');

function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Efecto de sombra en navbar
    if (navbar) {
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.3)';
        }
    }

    // Resaltar enlace activo según la sección visible
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
}

window.addEventListener('scroll', handleScroll);

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

// ===================================
// FORMULARIO DE CONTACTO (INICIO)
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        // Si el action es formspree, dejamos que el navegador maneje el envío por defecto 
        // a menos que queramos manejarlo con AJAX (como estaba antes con Web3Forms).
        // En la versión 8131cdf, el formulario de index.html usa formspree.io.

        const action = contactForm.getAttribute('action');
        if (action && action.includes('formspree.io')) {
            // Permitir envío normal si es Formspree y no hay lógica extra definida
            return;
        }

        e.preventDefault();
        const submitButton = contactForm.querySelector('.submit-btn-yellow, .submit-btn');
        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Enviando...</span>';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(action || 'https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (formMessage) showMessage('✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            if (formMessage) showMessage('❌ Error al enviar. Por favor intenta nuevamente.', 'error');
            console.error('Error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

function showMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 6000);

    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================================
// MODALES DE SERVICIOS
// ===================================
const servicesData = {
    'vigilancia-fija': {
        title: 'Vigilancia Fija',
        description: 'Ofrecemos servicios de vigilancia física fija con personal altamente calificado y rigurosamente seleccionado. Nuestros guardias están entrenados en control de accesos, prevención de pérdidas, atención al cliente y respuesta ante emergencias. Ideal para conjuntos residenciales, edificios corporativos, plantas industriales y centros comerciales.',
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

/**
 * Abre el modal de un servicio específico
 */
function openServiceModal(serviceKey) {
    const serviceModal = document.getElementById('serviceModal');
    if (!serviceModal) return;

    const modalContent = serviceModal.querySelector('.modal-content');
    const service = servicesData[serviceKey];
    if (!service) return;

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

    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);

    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Eventos para cerrar modal de servicios
window.addEventListener('click', (e) => {
    const serviceModal = document.getElementById('serviceModal');
    if (e.target === serviceModal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===================================
// GALERÍA (BENEFICIOS)
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
            'images/tecnologia.jpg', 'images/escolta.jpg',
            'images/vigilancia-fija.jpg', 'images/vigilancia-movil.jpg'
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

    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeGalleryModal() {
    if (galleryModal) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const closeGalleryBtn = document.querySelector('#galleryModal .close-modal');
if (closeGalleryBtn) closeGalleryBtn.addEventListener('click', closeGalleryModal);


// ===================================
// TRABAJA CON NOSOTROS (GESTIÓN DE ARCHIVOS)
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

// ===================================
// ANIMACIÓN DE CONTADORES
// ===================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const currentText = counter.innerText;
            const count = +currentText.replace(/[^0-9]/g, '');
            const inc = target / speed;

            if (count < target) {
                const nextCount = Math.ceil(count + inc);
                if (currentText.includes('+')) counter.innerText = `+${nextCount}`;
                else if (currentText.includes('%')) counter.innerText = `${nextCount}%`;
                else if (currentText.includes('/7')) counter.innerText = `${nextCount}/7`;
                else counter.innerText = nextCount;

                setTimeout(updateCount, 1);
            } else {
                if (currentText.includes('+')) counter.innerText = `+${target}`;
                else if (currentText.includes('%')) counter.innerText = `${target}%`;
                else if (currentText.includes('/7')) counter.innerText = `${target}/7`;
                else counter.innerText = target;
            }
        };

        // Reset inicial a 0 manteniendo el formato
        if (counter.innerText.includes('+')) counter.innerText = '+0';
        else if (counter.innerText.includes('%')) counter.innerText = '0%';
        else if (counter.innerText.includes('/7')) counter.innerText = '0/7';
        else counter.innerText = '0';

        updateCount();
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

// ===================================
// ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
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

// ===================================
// OBSERVADOR DE ANIMACIÓN (FADE-IN)
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
    if (typeof grecaptcha !== 'undefined' && document.getElementById('captcha-pqrsf')) {
        recaptchaWidgets['pqrsf'] = grecaptcha.render('captcha-pqrsf', {
            'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // USAR LLAVE DE PRODUCCIÓN AQUÍ
            'theme': 'light'
        });
    }
    if (typeof grecaptcha !== 'undefined' && document.getElementById('captcha-delator')) {
        recaptchaWidgets['delator'] = grecaptcha.render('captcha-delator', {
            'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // USAR LLAVE DE PRODUCCIÓN AQUÍ
            'theme': 'light'
        });
    }
};
window.onloadCallback = onloadCallback;

// Manejo unificado de todos los formularios del sitio
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        const isAtencionForm = form.classList.contains('atencion-form');
        const submitButton = form.querySelector('button[type="submit"], .atencion-btn, .submit-btn-yellow');

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

        // Estado de carga visual (el formulario se envía por método nativo POST si no se previene)
        if (submitButton) {
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Enviando...</span>';

            // Re-habilitar después de un tiempo corto por si falla el envío nativo o tarda
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 6000);
        }
    });
});

// ===================================
// LÓGICA DEL MODAL ATERA (PRÓXIMAMENTE)
// ===================================
function openAteraModal(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('ateraModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll
    }
}

function closeAteraModal() {
    const modal = document.getElementById('ateraModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Habilitar scroll
    }
}

// Cerrar al hacer clic fuera
window.addEventListener('click', function (event) {
    const modal = document.getElementById('ateraModal');
    if (event.target === modal) {
        closeAteraModal();
    }
});

// Agregar listeners automáticos a todos los enlaces que contengan "Atera"
document.querySelectorAll('a').forEach(link => {
    if (link.textContent.trim() === 'Atera') {
        link.addEventListener('click', openAteraModal);
    }
});




