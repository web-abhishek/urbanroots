// related-products.js

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch the JSON data
        const response = await fetch('../js/product.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        const productData = await response.json();
        
        // Function to create a product card
        function createProductCard(product) {
            return `
                <div class="col-md-3 col-sm-6">
                    <div class="product-card">
                        ${product.isNew ? '<span class="badge bg-success">New</span>' : ''}
                        ${product.onSale ? '<span class="badge bg-danger">Sale</span>' : ''}
                        
                        <div class="product-thumb">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        </div>
                        
                        <div class="product-details">
                            <h4 class="product-title">${product.name}</h4>
                            <div class="product-rating">
                                ${product.rating}
                            </div>
                            <div class="product-price">
                                ${product.price !== product.originalPrice 
                                    ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` 
                                    : ''}
                                <span class="current-price">$${product.price.toFixed(2)}</span>
                            </div>
                            <div class="product-size">Size: ${product.size}</div>
                            <p class="product-desc">${product.description}</p>
                            <div class="product-buttons">
                                <button class="btn btn-outline-secondary btn-sm" onclick="viewDetails(${product.id})">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to render related products
        function renderRelatedProducts(products) {
            const container = document.getElementById('related-products-container');
            
            if (!container) {
                console.error('Related products container not found');
                return;
            }
            
            // Clear existing content
            container.innerHTML = '';
            
            // Get a random selection of 4 products (or fewer if there aren't enough)
            const relatedProducts = getRandomProducts(products, 4);
            
            // Create and append product cards
            relatedProducts.forEach(product => {
                container.insertAdjacentHTML('beforeend', createProductCard(product));
            });
        }
        
        // Helper function to get random products
        function getRandomProducts(products, count) {
            // Make a copy of the array to avoid modifying the original
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, Math.min(count, products.length));
        }

        // Initial render
        renderRelatedProducts(productData.products);
        
    } catch (error) {
        console.error('Error loading related products:', error);
        // You could show an error message to the user here
        const container = document.getElementById('related-products-container');
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center py-4">
                    <p class="text-danger">Unable to load related products. Please try again later.</p>
                </div>
            `;
        }
    }
});

window.viewDetails = (id) => {
    localStorage.setItem("productId", JSON.stringify(id));
    window.location.href = "product-details.html";
};