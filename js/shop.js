const productsContainer = document.getElementById('products-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const sizeButtons = document.querySelectorAll('.size-btn');
const collectionButtons = document.querySelectorAll('.collection-btn');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');

let allProducts = [];
let filteredProducts = [];

let currentCategory = 'all';
let currentSize = 'all';
let currentCollection = 'all';
let currentSort = 'default';
let currentSearch = '';

async function fetchProducts() {
    try {
        const response = await fetch("../js/product.json");
        const data = await response.json();
        allProducts = data.products;
        filteredProducts = [...allProducts];
        renderProducts(filteredProducts);
        
        setInitialActiveStates();
    } catch (error) {
        console.error('Error Loading Products', error);
    }
}

function setInitialActiveStates() {
    document.querySelector('.category-btn[data-category="all"]')?.classList.add('active');
    document.querySelector('.size-btn[data-size="all"]')?.classList.add('active');
    document.querySelector('.collection-btn[data-collection="all"]')?.classList.add('active');
}

const renderProducts = (products) => {
    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products match your filters.</p>';
        return;
    }
    
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4';
        productCard.innerHTML = `
            <div class="product-card">
                <img src="./images/${product.image}" alt="${product.name}" />
                <h6>${product.name}</h6>
                <div class="d-flex align-items-center justify-content-around">
                    <p class="product-price">$${product.price}</p>
                    <button class="btn-view" onclick="viewDetails(${product.id})">View More</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
};

function filterByCategory(category) {
    currentCategory = category;
    applyFilters();
}

function filterBySize(size) {
    currentSize = size;
    applyFilters();
}

function filterByCollection(collection) {
    currentCollection = collection;
    applyFilters();
}

function sortProducts(sortOption) {
    currentSort = sortOption;
    applyFilters();
}

function searchProducts(searchTerm) {
    currentSearch = searchTerm.toLowerCase();
    applyFilters();
}

function applyFilters() {
    filteredProducts = [...allProducts];

    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentCategory
        );
    }

    if (currentSize !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.size === currentSize
        );
    }

    if (currentCollection === 'new') {
        filteredProducts = filteredProducts.filter(product => 
            product.isNew === true
        );
    } else if (currentCollection === 'sale') {
        filteredProducts = filteredProducts.filter(product => 
            product.onSale === true
        );
    }

    if (currentSearch) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearch)
            //  ||
            // (product.description && product.description.toLowerCase().includes(currentSearch))
        );
    }

    if (currentSort === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    renderProducts(filteredProducts);
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterByCategory(button.dataset.category);
    });
});

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterBySize(button.dataset.size);
    });
});

collectionButtons.forEach(button => {
    button.addEventListener('click', () => {
        collectionButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterByCollection(button.dataset.collection);
    });
});

sortSelect.addEventListener('change', (e) => {
    sortProducts(e.target.value);
});

searchInput.addEventListener('input', (e) => {
    searchProducts(e.target.value);
});

window.viewDetails = (id) => {
    localStorage.setItem("productId", JSON.stringify(id));
    window.location.href = "product-details.html";
};

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});