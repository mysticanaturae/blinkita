const isEnglish = document.documentElement.lang === 'en' || location.pathname.includes('/en/');
const isRoot = location.pathname === '/' || location.pathname === '/index.html';
const basePath = isRoot ? (isEnglish ? '/en/' : '/sl/') : location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1);

const NAV_ITEMS = isEnglish
    ? [['index.html','Home'],['body.html','Body'],['mind.html','Mind'],['time.html','Time'],['life.html','Life'],['circle.html','Circle'],['shop.html','Shop'],['ai.html','AI'],['you.html','YOUNIQUE']]
    : [['index.html','Domov'],['body.html','Body'],['mind.html','Mind'],['time.html','Time'],['life.html','Life'],['circle.html','Circle'],['shop.html','Shop'],['ai.html','AI'],['you.html','YOUNIQUE']];

function renderNavigation() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    const current = location.pathname.split('/').pop() || 'index.html';

    nav.innerHTML = NAV_ITEMS.map(([page, label]) =>
        `<a href="${basePath}${page}" class="${page === current ? 'active' : ''}">${label}</a>`
    ).join('');

    document.querySelector('.nav-toggle')?.addEventListener('click', () => nav.classList.toggle('open'));
}

document.addEventListener('DOMContentLoaded', renderNavigation);
