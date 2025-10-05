// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .service-card, .about-stats .stat');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Hero icon animation // 
const icons = document.querySelectorAll('.hero-icon');

// Store position data for each icon
const iconData = Array.from(icons).map(() => ({
  position: 0,
  direction: 1,
  speed: Math.random() * 0.3 + 0.2 // Random speed between 0.3-0.8
}));

function float() {
  icons.forEach((icon, index) => {
    const data = iconData[index];
    
    data.position += data.direction * data.speed;
    
    if (data.position > 20 || data.position < 0) {
      data.direction *= -1;
    }
    
    icon.style.transform = `translateY(${data.position}px)`;
  });
  
  requestAnimationFrame(float);
}

float();

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const business = formData.get('business');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2986CC' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add scroll-to-top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2986CC;
        color: #0f172a;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
        scrollBtn.style.background = '#2986CC';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.background = '#2986CC';
    });
    
    document.body.appendChild(scrollBtn);
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Add loading animation for skills section
function animateSkillsOnScroll() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        skillsObserver.observe(card);
    });
}

// Initialize skills animation
document.addEventListener('DOMContentLoaded', animateSkillsOnScroll);


// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2986CC !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Add this to your script.js file

// Language translations
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Quan Nguyen',
        'hero.subtitle': 'Front-End Developer',
        'hero.description': "I help small businesses create stunning websites that showcase their brand and drive growth. At 16, I'm passionate about building modern, responsive web experiences.",
        'hero.cta1': 'Get In Touch',
        'hero.cta2': 'Learn More',
        
        // About Section
        'about.title': 'About Me',
        'about.text1': "I'm a 16-year-old front-end developer with a passion for creating beautiful, functional websites that help small businesses establish their online presence and grow.",
        'about.text2': 'I believe every business deserves a professional website that represents their brand and connects with their customers. My goal is to make quality web development accessible to small businesses through modern tools and efficient development practices.',
        'about.stat1': 'Years Old',
        'about.stat2': 'Dedicated',
        'about.stat3': 'Delivery',
        
        // Skills Section
        'skills.title': 'My Skills',
        'skills.html': 'Semantic markup and accessibility best practices',
        'skills.css': 'Modern styling with Flexbox, Grid, and animations',
        'skills.js': 'Interactive functionality and DOM manipulation',
        'skills.tools': 'Development Tools',
        
        // Projects Section
        'projects.title': 'My Projects',
        'projects.subtitle': "Here are some of the websites I've built",
        'projects.gym.title': 'Gym website',
        'projects.gym.desc': 'Fully responsive gym website designed to showcase services and membership plans with a modern, user-friendly interface.',
        'projects.portfolio.title': 'Portfolio website',
        'projects.portfolio.desc': 'My personal portfolio website where I show my work and skills',
        'projects.live': 'Live Demo',
        'projects.github': 'GitHub',
        'projects.view': 'View',
        
        // Contact Section
        'contact.title': 'Get In Touch',
        'contact.heading': "Let's Work Together",
        'contact.text': "Ready to take your business online? I'd love to help you create a website that represents your brand and drives growth.",
        'contact.email': 'quan.webdev@gmail.com',
        'contact.phone': 'Available for consultation',
        'contact.time': 'Quick response time',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.business': 'Business Name',
        'contact.form.message': 'Project Details',
        'contact.form.submit': 'Send Message',
        
        // Footer
        'footer.text': 'Front-End Developer helping small businesses grow online',
        'footer.copyright': '2025 John Nguyen. All rights reserved.',
        
        // Notifications
        'notif.required': 'Please fill in all required fields.',
        'notif.email': 'Please enter a valid email address.',
        'notif.success': "Thank you for your message! I'll get back to you soon."
    },
    cz: {
        // Navigation
        'nav.home': 'Domů',
        'nav.about': 'O mně',
        'nav.skills': 'Dovednosti',
        'nav.projects': 'Projekty',
        'nav.contact': 'Kontakt',
        
        // Hero Section
        'hero.title': 'Quan Nguyen',
        'hero.subtitle': 'Front-End Vývojář',
        'hero.description': 'Pomáhám malým firmám vytvářet úžasné webové stránky, které prezentují jejich značku a podporují růst. V 16 letech jsem nadšený pro tvorbu moderních responzivních webových zážitků.',
        'hero.cta1': 'Kontaktujte mě',
        'hero.cta2': 'Dozvědět se více',
        
        // About Section
        'about.title': 'O mně',
        'about.text1': 'Je mi 16 let a jsem front-end vývojář s vášní pro vytváření krásných a funkčních webových stránek, které pomáhají malým firmám etablovat jejich online přítomnost a růst.',
        'about.text2': 'Věřím, že každá firma si zaslouží profesionální webovou stránku, která reprezentuje jejich značku a spojuje se se zákazníky. Mým cílem je zpřístupnit kvalitní vývoj webu malým firmám pomocí moderních nástrojů a efektivních vývojových praktik.',
        'about.stat1': 'Let',
        'about.stat2': 'Oddaný',
        'about.stat3': 'Dodání',
        'about.stat4': 'Rychlé',
        
        // Skills Section
        'skills.title': 'Moje dovednosti',
        'skills.html': 'Sémantické značkování a osvědčené postupy přístupnosti',
        'skills.css': 'Moderní stylování s Flexbox, Grid a animacemi',
        'skills.js': 'Interaktivní funkce a manipulace s DOM',
        'skills.tools': 'Vývojové nástroje',
        
        // Projects Section
        'projects.title': 'Moje projekty',
        'projects.subtitle': 'Zde jsou některé webové stránky, které jsem vytvořil',
        'projects.gym.title': 'Web pro fitness centrum',
        'projects.gym.desc': 'Plně responzivní web pro fitness centrum navržený k prezentaci služeb a členských plánů s moderním, uživatelsky přívětivým rozhraním.',
        'projects.portfolio.title': 'Portfolio webová stránka',
        'projects.portfolio.desc': 'Moje osobní portfolio, kde ukazuji svou práci a dovednosti',
        'projects.live': 'Živá ukázka',
        'projects.github': 'GitHub',
        'projects.view': 'Zobrazit',
        'projects.title2': 'Moje portfolio',
        'projects.portfolio.desc': 'Moje osobní portfolio, kde představuji svou práci a dovednosti.',
        
        // Contact Section
        'contact.title': 'Spojte se se mnou',
        'contact.heading': 'Pojďme spolupracovat',
        'contact.text': 'Jste připraveni uvést své podnikání online? Rád vám pomůžu vytvořit webovou stránku, která reprezentuje vaši značku a podporuje růst.',
        'contact.email': 'quan.webdev@gmail.com',
        'contact.phone': 'K dispozici pro konzultaci',
        'contact.time': 'Rychlá doba odezvy',
        'contact.form.name': 'Jméno',
        'contact.form.email': 'Email',
        'contact.form.business': 'Název firmy',
        'contact.form.message': 'Detaily projektu',
        'contact.form.submit': 'Odeslat zprávu',
        
        // Footer
        'footer.text': 'Front-End vývojář pomáhající malým firmám růst online',
        'footer.copyright': '2025 John Nguyen. Všechna práva vyhrazena.',
        
        // Notifications
        'notif.required': 'Vyplňte prosím všechna povinná pole.',
        'notif.email': 'Zadejte prosím platnou emailovou adresu.',
        'notif.success': 'Děkuji za vaši zprávu! Brzy se vám ozvu.'
    }
};

// Current language (default English)
let currentLang = 'en';

// Language switcher functionality
function initLanguageSwitcher() {
    const langBtn = document.getElementById('langSwitch');
    
    // Check if there's a saved language preference
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
        updateButtonText(langBtn);
    }
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'cz' : 'en';
        localStorage.setItem('preferredLang', currentLang);
        updateLanguage(currentLang);
        updateButtonText(langBtn);
    });
}

function updateButtonText(btn) {
    btn.innerHTML = `<i class="fas fa-language"></i> ${currentLang === 'en' ? 'CZ' : 'EN'}`;
}

function updateLanguage(lang) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update notification messages if needed
    window.currentLangTranslations = translations[lang];
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
});

// Update the showNotification function to use translations
const originalShowNotification = showNotification;
showNotification = function(messageKey, type) {
    const message = window.currentLangTranslations && window.currentLangTranslations[messageKey] 
        ? window.currentLangTranslations[messageKey] 
        : messageKey;
    originalShowNotification(message, type);
};

// Update contact form to use translated messages
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const business = formData.get('business');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        showNotification('notif.required', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('notif.email', 'error');
        return;
    }
    
    showNotification('notif.success', 'success');
    contactForm.reset();
});