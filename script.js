// Configuration initiale au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des gestionnaires
    initializeNavigation();
    initializeIframeHandlers();
    initializeSocialLinks();

    // Gestion du redimensionnement et de l'orientation
    window.addEventListener('orientationchange', handleOrientationChange);
});

// Gestion de la navigation
function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = navLinks.classList.contains('active');
            
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Amélioration de l'accessibilité
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Ouvrir le menu' : 'Fermer le menu');
        });

        // Gestion de la navigation douce
        setupSmoothScrolling(navLinks);
    }
}

// Configuration du défilement fluide
function setupSmoothScrolling(navLinks) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = targetId ? document.querySelector(targetId) : null;
            
            if (targetSection) {
                // Fermeture du menu mobile si nécessaire
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gestion des iframes
function initializeIframeHandlers() {
    const iframeContainers = document.querySelectorAll('.iframe-container');
    
    iframeContainers.forEach(container => {
        const iframe = container.querySelector('iframe');
        if (iframe) {
            setupIframeInteraction(iframe, container);
        }
    });
}

// Configuration des interactions iframe
function setupIframeInteraction(iframe, container) {
    iframe.style.pointerEvents = 'auto';
    
    // Gestion des événements tactiles
    const touchEvents = ['touchstart', 'touchend'];
    touchEvents.forEach(eventType => {
        container.addEventListener(eventType, () => {
            iframe.style.pointerEvents = 'auto';
        }, { passive: true });
    });

    // Gestion du chargement
    iframe.addEventListener('load', () => {
        iframe.style.opacity = '1';
    });

    iframe.addEventListener('error', () => {
        console.error(`Erreur de chargement pour l'iframe: ${iframe.src}`);
        // Possibilité d'ajouter un message d'erreur visible
    });
}

// Gestion des liens sociaux
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-icons a');
    
    socialLinks.forEach(link => {
        ['touchstart', 'click'].forEach(eventType => {
            link.addEventListener(eventType, (e) => {
                e.stopPropagation();
            }, eventType === 'touchstart' ? { passive: false } : undefined);
        });
    });
}

// Gestion du changement d'orientation
function handleOrientationChange() {
    setTimeout(() => {
        initializeIframeHandlers();
        initializeSocialLinks();
    }, 100);
}