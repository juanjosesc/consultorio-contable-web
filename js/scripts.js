/**
 * ARCHIVO JAVASCRIPT - CONSULTORIO CONTABLE Y TRIBUTARIO
 * Animaciones y funcionalidad interactiva
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    /* ===========================================
       ANIMACIÓN SUAVE AL HACER SCROLL
       =========================================== */
    // Seleccionar todos los enlaces que apuntan a anclas (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Obtener el elemento objetivo
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Hacer scroll suave hasta el elemento
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    /* ===========================================
       ANIMACIÓN DE APARICIÓN AL HACER SCROLL
       =========================================== */
    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -100px 0px' // Margen inferior para activar antes
    };
    
    // Crear el observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplicar estilos iniciales
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                // Aplicar animación después de un pequeño retraso
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Dejar de observar el elemento una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .info-card, .segment-card, .testimonial-card, .why-box'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    /* ===========================================
       MANEJO DEL BOTÓN DE WHATSAPP
       =========================================== */
    // Mostrar/ocultar el botón de WhatsApp basado en el scroll
    let lastScrollTop = 0;
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si el usuario hace scroll hacia abajo, ocultar el botón
        // Si hace scroll hacia arriba, mostrar el botón
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            whatsappButton.style.transform = 'scale(0)';
        } else {
            whatsappButton.style.transform = 'scale(1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    /* ===========================================
       VALIDACIÓN DE FORMULARIOS (si se agregan en el futuro)
       =========================================== */
    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Función para validar teléfono (Colombia)
    function validatePhone(phone) {
        const re = /^(\+57|57)?[ -]?3[ -]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
        return re.test(phone);
    }
    
    /* ===========================================
       MEJORAR RENDIMIENTO DE ANIMACIONES
       =========================================== */
    // Throttle function para limitar la frecuencia de eventos
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Aplicar throttle a eventos de scroll si es necesario
    // window.addEventListener('scroll', throttle(function() {
    //     // Código que se ejecuta en scroll
    // }, 100));
    
    /* ===========================================
       CARGA DIFERIDA DE IMÁGENES (Lazy Loading)
       =========================================== */
    // Si en el futuro se agregan más imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
});

/* ===========================================
   FUNCIÓN PARA ANALYTICS (si se implementa)
   =========================================== */
function trackEvent(category, action, label) {
    // Si tienes Google Analytics instalado
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

/* ===========================================
   MENSAJE EN CONSOLA
   =========================================== */
console.log('%c¡Bienvenido a Consultorio Contable y Tributario!', 
    'color: #016b1e; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado con ❤️ para ayudarte a crecer', 
    'color: #e09c3a; font-size: 14px;');