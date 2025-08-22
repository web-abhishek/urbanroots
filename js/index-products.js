document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('../js/product.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    const products = data.products;

    function createProductCard(product) {
      return `
        <div class="col-md-4 col-lg-4">
          <div class="product-card">
            ${product.onSale ? '<span class="badge bg-danger">Sale</span>' : ''}
            <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
            <div class="card-body product-body">
              <h3 class="product-title">${product.name}</h3>
              <div class="product-rating">${product.rating}</div>
              <p class="product-description">${product.description}</p>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center p-2">
                  ${product.originalPrice ? `<del>$${product.originalPrice.toFixed(2)}</del>` : ''}
                  <p class="product-price mb-0 ms-2">$${product.price.toFixed(2)}</p>
                </div>  
                <button class="btn btn-secondary" onclick="viewDetails(${product.id})">View More</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    const container = document.getElementById('products-container');
    if (!container) return;

    const saleProducts = products.slice(0, 6);
    
    container.innerHTML = saleProducts.map(createProductCard).join('');

  } catch (error) {
    console.error('Error loading products:', error);
  }
});

window.viewDetails = (id) => {
    localStorage.setItem("productId", JSON.stringify(id));
    window.location.href = "product-details.html";
};