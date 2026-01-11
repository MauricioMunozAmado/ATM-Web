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
