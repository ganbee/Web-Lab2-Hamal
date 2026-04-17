// 1. РЕНДЕРИНГ (НОВИНИ ТА ТУРИ)
function renderNews() {
    const container = document.getElementById('news-accordion');
    if (!container) return;
    
    [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(item => {
        const div = document.createElement('div');
        div.className = `news-item status-${item.status}`;
        div.innerHTML = `
            <div class="news-header"><h3>${item.title}</h3><span>${item.date}</span></div>
            <div class="news-body">
                <p><strong>${item.content}</strong></p>
                <p class="news-extra-text">${item.fullDescription}</p>
            </div>`;
        div.onclick = () => div.classList.toggle('expanded');
        container.appendChild(div);
    });
}

function renderDestinations(data) {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(item => `
        <div class="destination-card" onclick="this.classList.toggle('active')">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-info">
                <h4>${item.title} <span>$${item.price}</span></h4>
                <p>${item.description}</p>
                <div class="card-desc-full"><hr><p>${item.details}</p></div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${item.id})">Додати в кошик</button>
            </div>
        </div>
    `).join('');
}

// 2. ФІЛЬТРАЦІЯ ТА ПОШУК
function applyFilters() {
    const query = document.getElementById('main-search').value.toLowerCase();
    const activeBtn = document.querySelector('.filter-btn.active');
    const type = activeBtn ? activeBtn.dataset.type : 'all';
    const sort = document.getElementById('sort-select').value;

    let filtered = destinationsData.filter(item => 
        (type === 'all' || item.type === type) && 
        item.title.toLowerCase().includes(query)
    );

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else filtered.sort((a, b) => a.title.localeCompare(b.title));

    renderDestinations(filtered);
}

function initFilterEvents() {
    const searchInput = document.getElementById('main-search');
    const sortSelect = document.getElementById('sort-select');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (searchInput) searchInput.oninput = applyFilters;
    if (sortSelect) sortSelect.onchange = applyFilters;

    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        };
    });
}

// 3. BOM ФУНКЦІЇ (ПРОМО, СКРОЛ, ПІДПИСКА)
function showPromo() {
    const m = document.getElementById('promo-modal');
    const b = document.getElementById('close-promo');
    const t = document.getElementById('promo-timer');
    if (!m) return;

    let time = 5;
    m.style.display = 'flex';
    const timer = setInterval(() => {
        t.innerText = --time;
        if (time <= 0) { 
            clearInterval(timer); 
            b.disabled = false; 
            b.innerText = "Закрити"; 
        }
    }, 1000);
    b.onclick = () => m.style.display = 'none';
}

function initBOMEvents() {
    // Підписка
    const subBanner = document.getElementById('subscribe-banner');
    if (!localStorage.getItem('sub') && subBanner) {
        setTimeout(() => subBanner.style.display = 'block', 2000);
    }

    document.getElementById('sub-accept').onclick = () => { 
        localStorage.setItem('sub', '1'); 
        subBanner.style.display = 'none'; 
    };
    document.getElementById('sub-reject').onclick = () => {
        subBanner.style.display = 'none';
    };

    // Кнопка вгору
    window.onscroll = () => {
        const s = document.documentElement;
        const btt = document.getElementById('backToTop');
        if (btt) {
            btt.style.display = (s.scrollTop > (s.scrollHeight - s.clientHeight) * 0.6) ? 'block' : 'none';
        }
    };
    document.getElementById('backToTop').onclick = () => window.scrollTo({top:0, behavior:'smooth'});
    
    // Таймер промо
    setTimeout(showPromo, 3000);
}

// 4. ГОЛОВНИЙ ЗАПУСК 
window.onload = () => {
    renderNews();
    renderDestinations(destinationsData);
    renderHotDeals(); 

    initCarouselEvents(); 
    initCartLogic();      
    initAuthEvents();     
    
    initFilterEvents();
    initBOMEvents();

    window.addEventListener('click', () => {
        const dropdown = document.getElementById('cart-dropdown');
        if (dropdown) dropdown.classList.remove('active');
    });
};