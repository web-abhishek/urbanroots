Project Logic & Readme
E-Commerce Shop Page: Logic Document
This document outlines the core logic and architecture of the dynamic shop page, powered by JavaScript.

1. Data Management
Single Source of Truth: The allProducts array is the authoritative list of all products. It is fetched once from product.json when the page loads and is never modified.

Dynamic State: The filteredProducts array represents the current view of products. All filtering and sorting operations are performed on a fresh copy of allProducts, not on the original data. This ensures that filters can be combined, removed, or changed without any side effects.

User State: Variables like currentCategory, currentSize, currentSearch, etc., maintain the user's selected filters and sorting options. This central state allows all filtering logic to be consolidated in a single function.

2. The Core Filtering and Rendering Loop
The entire dynamic functionality of the shop page follows a simple, repeatable loop:

Event Trigger: A user interacts with the page by clicking a filter button, selecting a sort option, or typing in the search bar.

State Update: An event listener calls a small function (e.g., filterByCategory) that updates the appropriate state variable (e.g., currentCategory).

Filter Application: The state update function calls the central applyFilters() function.

Data Processing: applyFilters() takes the following steps:

It creates a new array by copying allProducts.

It applies each active filter (category, size, collection, search) sequentially using Array.prototype.filter(), refining the product list with each step.

It applies the sorting logic using Array.prototype.sort() to order the final list.

UI Update: The final processed filteredProducts array is passed to the renderProducts() function. This function clears the product grid and rebuilds the HTML from scratch with the new list of products, reflecting the user's choices.

3. Key Functions
fetchProducts(): The entry point for data. It retrieves product.json, initializes the allProducts and filteredProducts arrays, and triggers the initial rendering.

renderProducts(products): Manages the UI. It receives a list of products and dynamically creates HTML elements for each one, then appends them to the page. It also handles the "no products found" scenario.

applyFilters(): The central logic hub. It orchestrates all filtering and sorting operations based on the current state and passes the final result to renderProducts.

viewDetails(id): Handles navigation to the product details page. It uses localStorage to temporarily store the ID of the selected product, allowing the details page to access and display the correct information.

4. HTML Attributes for Logic
data-* attributes: Filter buttons use data attributes (e.g., data-category="indoor") to store their filter value directly in the HTML. This decouples the JavaScript logic from the specific content of the buttons, making it easy to add or change filters without modifying the JavaScript.

class="active": A CSS class is toggled on filter buttons to provide visual feedback to the user, indicating which filter is currently selected.