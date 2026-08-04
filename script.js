/* ==========================================================================
   SD BONÉS — Scripts da Landing Page
   ========================================================================== */

const WHATSAPP_NUMBER = '5584986158290';

const galleryItems = [
    {
        name: 'SD Street Fire',
        category: 'abareta',
        price: 'R$ 49,90',
        image: 'https://i.ibb.co/prLkQvh6/Captura-de-tela-2026-08-04-180949.png'
    },
    {
        name: 'SD Rota Verde',
        category: 'abareta',
        price: 'R$ 49,90',
        image: 'https://i.ibb.co/WN45C6Bv/Captura-de-tela-2026-08-04-181000.png'
    },
    {
        name: 'SD Clássica Branca',
        category: 'abareta',
        price: 'R$ 44,90',
        image: 'https://i.ibb.co/prL7BTHK/Captura-de-tela-2026-08-04-181010.png'
    },
    {
        name: 'SD Mesh Trucker',
        category: 'trucker',
        price: 'R$ 39,90',
        image: 'https://i.ibb.co/xKWR52sK/Captura-de-tela-2026-08-04-181018.png'
    },
    {
        name: 'SD Urbana',
        category: 'americano',
        price: 'R$ 42,90',
        image: 'https://i.ibb.co/7xkqh3Cv/Captura-de-tela-2026-08-04-181025.png'
    },
    {
        name: 'SD Meu Time',
        category: 'personalizados',
        price: 'Sob consulta',
        image: 'https://i.ibb.co/nsc21jdS/Captura-de-tela-2026-08-04-181036.png'
    },
    {
        name: 'SD Black Premium',
        category: 'americano',
        price: 'R$ 47,90',
        image: 'https://i.ibb.co/1YDzjqKJ/Captura-de-tela-2026-08-04-181048.png'
    },
    {
        name: 'SD Edição Limitada',
        category: 'personalizados',
        price: 'Sob consulta',
        image: 'https://i.ibb.co/zTVGML9s/Captura-de-tela-2026-08-04-181057.png'
    },
    {
        name: 'SD Trucker Neon',
        category: 'trucker',
        price: 'R$ 39,90',
        image: 'https://i.ibb.co/5ZthRn2/Captura-de-tela-2026-08-04-181110.png'
    }
];

/* ---------- Render Galeria ---------- */
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery(items) {
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
                    <button class="btn-details" data-name="${item.name}">
                        <i class="fa-solid fa-eye"></i> Ver Detalhes
                    </button>
                    <button class="btn-order" data-name="${item.name}">
                        <i class="fa-brands fa-whatsapp"></i> Encomendar
                    </button>
                </div>
            </div>
        `;
        galleryGrid.appendChild(card);
    });

    galleryGrid.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => showDetails(btn.dataset.name));
    });

    galleryGrid.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', () => orderItem(btn.dataset.name));
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

/* ---------- Detalhes & Encomenda ---------- */
function showDetails(name) {
    const item = galleryItems.find(i => i.name === name);
    if (!item) return;
    Swal.fire({
        title: name,
        text: `Modelo ${categoryLabel(item.category)} da SD Bonés por ${item.price}. Bordado premium, tecido selecionado e envio para todo o Brasil.`,
        icon: 'info',
        iconColor: '#FF8800',
        background: '#151515',
        color: '#FFFFFF',
        confirmButtonText: 'Encomendar agora',
        confirmButtonColor: '#E60000',
        cancelButtonText: 'Fechar',
        showCancelButton: true,
        cancelButtonColor: '#333333'
    }).then(result => {
        if (result.isConfirmed) orderItem(name);
    });
}

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
