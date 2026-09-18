/* ==========================================================================
   SD BONÉS — Scripts da Landing Page
   ========================================================================== */

const WHATSAPP_NUMBER = '5584986158290';

const galleryItems = [
    {
        name: 'SD Street Fire',
        category: 'abareta',
        price: 'R$ 49,90',
        image: 'images/bone-01.webp'
    },
    {
        name: 'SD Rota Verde',
        category: 'abareta',
        price: 'R$ 49,90',
        image: 'images/bone-02.webp'
    },
    {
        name: 'SD Clássica Branca',
        category: 'abareta',
        price: 'R$ 44,90',
        image: 'images/bone-03.webp'
    },
    {
        name: 'SD Mesh Trucker',
        category: 'trucker',
        price: 'R$ 39,90',
        image: 'images/bone-04.webp'
    },
    {
        name: 'SD Urbana',
        category: 'americano',
        price: 'R$ 42,90',
        image: 'images/bone-05.webp'
    },
    {
        name: 'SD Meu Time',
        category: 'personalizados',
        price: 'Sob consulta',
        image: 'images/bone-06.webp'
    },
    {
        name: 'SD Black Premium',
        category: 'americano',
        price: 'R$ 47,90',
        image: 'images/bone-07.webp'
    },
    {
        name: 'SD Edição Limitada',
        category: 'personalizados',
        price: 'Sob consulta',
        image: 'images/bone-08.webp'
    },
    {
        name: 'SD Trucker Neon',
        category: 'trucker',
        price: 'R$ 39,90',
        image: 'images/bone-09.webp'
    }
];

/* ---------- Render Galeria ---------- */
const galleryGrid = document.getElementById('galleryGrid');
let currentItems = galleryItems;

function renderGallery(items) {
    currentItems = items;
    galleryGrid.innerHTML = '';
    items.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'gallery-item';
        card.style.animationDelay = `${index * 60}ms`;
        card.innerHTML = `
            <div class="gallery-img-wrap">
                <img src="${item.image}" alt="${item.name} — boné da SD Bonés" loading="lazy">
            </div>
            <div class="gallery-overlay">
                <span class="gallery-cat">${categoryLabel(item.category)}</span>
                <h3 class="gallery-name">${item.name}</h3>
                <div class="gallery-actions">
                    <button class="btn-details" data-index="${index}">
                        <i class="fa-solid fa-expand"></i> Visualizar
                    </button>
                    <button class="btn-order" data-name="${item.name}">
                        <i class="fa-brands fa-whatsapp"></i> Encomendar
                    </button>
                </div>
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-order')) {
                orderItem(e.target.closest('.btn-order').dataset.name);
                return;
            }
            openLightbox(index);
        });
        galleryGrid.appendChild(card);
    });
}

function categoryLabel(cat) {
    const map = {
        abareta: 'Aba Reta',
        trucker: 'Trucker',
        americano: 'Americano',
        personalizados: 'Personalizado'
    };
    return map[cat] || cat;
}

/* ---------- Filtros ---------- */
const filterBar = document.getElementById('filterBar');

filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const items = filter === 'todos'
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    renderGallery(items);
});

/* ---------- Lightbox Galeria ---------- */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbBg = document.getElementById('lbBg');
const lbCounter = document.getElementById('lbCounter');
const lbOrder = document.getElementById('lbOrder');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let lbIndex = 0;

function openLightbox(index) {
    lbIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const item = currentItems[lbIndex];
    if (!item) return;
    lbImage.src = item.image;
    lbImage.alt = item.name;
    lbBg.style.backgroundImage = `url('${item.image}')`;
    lbOrder.onclick = () => orderItem(item.name);
    lbCounter.textContent = `${lbIndex + 1} / ${currentItems.length}`;
}

function prevItem() {
    if (currentItems.length === 0) return;
    lbIndex = (lbIndex - 1 + currentItems.length) % currentItems.length;
    updateLightbox();
}

function nextItem() {
    if (currentItems.length === 0) return;
    lbIndex = (lbIndex + 1) % currentItems.length;
    updateLightbox();
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevItem);
lbNext.addEventListener('click', nextItem);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevItem();
    if (e.key === 'ArrowRight') nextItem();
});

function orderItem(name) {
    const msg = encodeURIComponent(`Olá! Quero encomendar o modelo *${name}* da SD Bonés. Podem me passar mais detalhes?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener');
}

/* ---------- Navbar Scroll ---------- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 500);
});

/* ---------- Menu Mobile ---------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ---------- Active Link on Scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

/* ---------- Reveal on Scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Contadores ---------- */
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }

    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ---------- Ano do Rodapé ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Init ---------- */
renderGallery(galleryItems);
