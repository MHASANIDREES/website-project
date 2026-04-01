// src/home.js

// Default inventory items
export let inventory = [
    { id: 1, name: "MacBook Air", category: "Laptop", price: 350000, brand: "Apple" },
    { id: 2, name: "Galaxy S24", category: "Mobile", price: 280000, brand: "Samsung" },
    { id: 3, name: "Inspiron 15", category: "Laptop", price: 150000, brand: "Dell" },
    { id: 4, name: "Watch Series 9", category: "Wearable", price: 120000, brand: "Apple" },
    { id: 5, name: "ThinkPad X1", category: "Laptop", price: 200000, brand: "Lenovo" },
];

// RENDER CARDS
export const render = (data = inventory) => {
    const grid = document.getElementById('cardGrid');
    grid.innerHTML = data.map((item, index) => `
        <div class="card border-t-8 ${item.price>200000?'border-red-500':'border-green-500'}">
            <h3 class="text-2xl font-bold text-purple-800">${item.name}</h3>
            <p><b>ID:</b> ${item.id}</p>
            <p><b>Category:</b> ${item.category}</p>
            <p><b>Brand:</b> ${item.brand}</p>
            <p><b>Price:</b> ${item.price}</p>
            <button onclick="editItem(${index})" class="text-blue-600 hover:underline mr-2">Edit</button>
            <button onclick="deleteItem(${item.id})" class="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-bold hover:bg-red-200">Delete</button>
        </div>
    `).join('');
    runLogic();
};

// ADD PRODUCT
export const addProduct = () => {
    const name = document.getElementById('pName').value;
    const category = document.getElementById('pCategory').value;
    const price = parseFloat(document.getElementById('pPrice').value);
    const brand = document.getElementById('pBrand').value;

    if(name && price) {
        inventory.push({ id: inventory.length+1, name, category, price, brand });
        render();
        // Clear form
        document.getElementById('pName').value = '';
        document.getElementById('pCategory').value = '';
        document.getElementById('pPrice').value = '';
        document.getElementById('pBrand').value = '';
    } else {
        alert("Please fill at least Name and Price");
    }
};

// DELETE PRODUCT
export const deleteItem = (id) => {
    if(confirm("Are you sure you want to delete this product?")) {
        inventory = inventory.filter(item => item.id !== id);
        render();
    }
};

// EDIT PRODUCT
export const editItem = (index) => {
    const newName = prompt("Enter new product name:", inventory[index].name);
    const newCategory = prompt("Enter new category:", inventory[index].category);
    const newBrand = prompt("Enter new brand:", inventory[index].brand);
    const newPrice = prompt("Enter new price:", inventory[index].price);

    if(newName) inventory[index].name = newName;
    if(newCategory) inventory[index].category = newCategory;
    if(newBrand) inventory[index].brand = newBrand;
    if(newPrice) inventory[index].price = parseFloat(newPrice);

    render();
};

// FILTERS
export const applyFilters = () => {
    const n = document.getElementById('sName').value.toLowerCase();
    const c = document.getElementById('sCat').value.toLowerCase();
    const b = document.getElementById('sBrand').value.toLowerCase();
    const p = document.getElementById('sPrice').value;
    const id = document.getElementById('sID').value;

    const filtered = inventory.filter(item =>
        item.name.toLowerCase().includes(n) &&
        item.category.toLowerCase().includes(c) &&
        item.brand.toLowerCase().includes(b) &&
        (p==='' || item.price<=parseFloat(p)) &&
        item.id.toString().includes(id)
    );

    render(filtered);
};

// ANALYTICS LOGIC
export const runLogic = () => {
    const ifElseDiv = document.getElementById('ifElseOutput');
    const loopList = document.getElementById('loopOutput');
    ifElseDiv.innerHTML = '';
    loopList.innerHTML = '';

    // Price tiers
    inventory.forEach(item => {
        let tier = '';
        if(item.price<50000) tier='Budget';
        else if(item.price<100000) tier='Mid-Range';
        else if(item.price<200000) tier='Premium';
        else if(item.price<400000) tier='Flagship';
        else tier='Luxury';
        ifElseDiv.innerHTML += `<p><b>${item.name}:</b> ${tier}</p>`;
    });

    // Loop logs
    for(let i=0;i<inventory.length;i++){
        const li = document.createElement('li');
        li.textContent = `[${inventory[i].brand}] ${inventory[i].name} - Verified`;
        loopList.appendChild(li);
    }
};

// Make functions globally accessible
window.addProduct = addProduct;
window.deleteItem = deleteItem;
window.editItem = editItem;
window.applyFilters = applyFilters;

// INITIAL RENDER
render();
