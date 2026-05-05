/* ==================== MENU MOBILE ==================== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ==================== PREVIEW VIDÉO AU SURVOL ==================== */
document.querySelectorAll('.reel-card').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

/* ==================== MODAL VIDÉO ==================== */
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.reel-card').forEach(card => {
    card.addEventListener('click', () => {
        const src = card.getAttribute('data-src');
        if (!src) return;

        const previewVideo = card.querySelector('video');
        if (previewVideo) previewVideo.pause();

        modalVideo.src = src;
        modalVideo.load();
        videoModal.classList.add('open');

        modalVideo.play().catch(() => {});
    });
});

function closeModal() {
    videoModal.classList.remove('open');
    modalVideo.pause();
    modalVideo.src = '';
}

modalClose?.addEventListener('click', closeModal);
videoModal?.addEventListener('click', e => {
    if (e.target === videoModal) closeModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

/* ==================== LIGHTBOX PHOTOS ==================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('.lightbox-img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.classList.add('open');
        }
    });
});

lightboxClose?.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('open');
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox?.classList.remove('open');
});

/* ==================== FORMULAIRE CONTACT ==================== */
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    btn.disabled = true;
    setTimeout(() => {
        alert('✅ Message envoyé ! Je vous répondrai rapidement.');
        this.reset();
        btn.innerHTML = orig;
        btn.disabled = false;
    }, 1000);
});

/* ==================== ANIMATION AU SCROLL ==================== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reel-card, .portfolio-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

/* ==================== ACTIVE NAV LINK ==================== */
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});