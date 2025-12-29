/* LANDING DINÁMICA */
async function showSection(id) {
    const content = document.getElementById('content');
    try {
        const response = await fetch(`./public/components/sections/${id}.html`);
        if (!response.ok) throw new Error('Error al cargar la sección');
        const html = await response.text();
        content.innerHTML = html;
        
        // Si es el catálogo, poblarlo dinámicamente
        if (id === 'catalogo') {
            loadCatalog();
        }
    } catch (error) {
        console.error(error);
        content.innerHTML = '<p>Error al cargar la sección.</p>';
    }
}

// Cargar catálogo inicialmente (al cargar la página)
document.addEventListener('DOMContentLoaded', () => {
    showSection('catalogo');  // Muestra el catálogo por defecto
});

function toggleAuth() {
    const t = document.getElementById('authTitle');
    if (t) {
        t.textContent = t.textContent === 'Iniciar Sesión' ? 'Registro' : 'Iniciar Sesión';
    }
}

function needLogin() {
    document.getElementById('overlay').classList.add('active');
}

function closeOverlay() {
    document.getElementById('overlay').classList.remove('active');
}

/* CATÁLOGO DINÁMICO (SIMULA BD) */
function loadCatalog() {
    const products = [
        {name:'Osito Amigurumi', price:'$350', img:'https://images.unsplash.com/photo-1616401784845-180882ba9ba8'},
        {name:'Conejito Crochet', price:'$330', img:'https://images.unsplash.com/photo-1585386959984-a41552231693'},
        {name:'Bolsa Tejida', price:'$480', img:'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6'},
        {name:'Gorro Crochet', price:'$220', img:'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6'},
        {name:'Muñeca Amigurumi', price:'$520', img:'https://images.unsplash.com/photo-1618354691373-d851c5c3a990'}
    ];

    const container = document.getElementById('catalogContainer');
    if (container) {
        container.innerHTML = '';  // Limpiar antes de poblar
        products.forEach(p => {
            container.innerHTML += `
            <div class="col-md-4">
                <div class="card product-card" onclick="needLogin()">
                    <img src="${p.img}" class="card-img-top" alt="${p.name}">
                    <div class="card-body">
                        <h5>${p.name}</h5>
                        <p class="fw-bold">${p.price}</p>
                    </div>
                </div>
            </div>`;
        });
    }
}