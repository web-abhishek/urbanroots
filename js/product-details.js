// console.log("product-details");

const prodDetailsName = document.getElementById('proddetailsname');
const prodDetailsPrice = document.getElementById('proddetailsprice');
const prodDetailsDescription = document.getElementById('proddetailsdescription');

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

let prod = JSON.parse(localStorage.getItem("productId"));
console.log(prod.name);

// const valueSet = ()=>{
//     prodDetailsName.innerHTML = '';
//     prodDetailsName.textContent = prod.id;
//     console.log(prod.name);
    
// }

// valueSet();
