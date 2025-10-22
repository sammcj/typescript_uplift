// Global variables - intentionally not using proper state management
let currentLanguage: any = 'en-US';
let translations: any = null;
let inventoryData: any[] = []; // Added for inventory

// Load translations synchronously - not ideal
function loadTranslations() {
    console.log("Loading translations..."); // DEBUG
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `i18n/${currentLanguage}.json`, false);
    xhr.send();

    if (xhr.status === 200) {
        try {
            translations = JSON.parse(xhr.responseText);
            console.log("Translations loaded:", translations); // DEBUG
        } catch (e) {
            console.error('Failed to parse translations:', e);
            translations = {};
        }
    } else {
        console.error('Failed to load translations. Status:', xhr.status);
        translations = {};
    }
}

// Load inventory data synchronously - also not ideal
function loadInventoryData() {
    console.log("Loading inventory data..."); // DEBUG
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `data/inventory.json`, false);
    xhr.send();

    if (xhr.status === 200) {
        try {
            inventoryData = JSON.parse(xhr.responseText);
            console.log("Inventory data loaded:", inventoryData); // DEBUG
        } catch (e) {
            console.error('Failed to parse inventory data:', e);
            inventoryData = [];
        }
    } else {
        console.error('Failed to load inventory data. Status:', xhr.status);
        inventoryData = [];
    }
}

// Function to get image path for a product
function getProductImagePath(sku: string): string {
    // Check if image exists for this SKU, otherwise use placeholder
    return `inventory/images/${sku}.jpg`;
}

// Function to handle image loading errors
function handleImageError(img: HTMLImageElement, sku: string) {
    console.log(`Image not found for ${sku}, using placeholder`);
    img.src = 'inventory/images/placeholder.jpg';
    img.onerror = null; // Prevent infinite loop if placeholder also fails
}

// Function to prefill the SKU input field
function prefillSku(sku: string) {
    const productIdInput = document.getElementById('productIdInput') as HTMLInputElement | null;
    if (productIdInput) {
        productIdInput.value = sku;
        console.log("Prefilled SKU:", sku); // DEBUG
        // Trigger lookup automatically after prefill for better UX
        lookupStock();
    } else {
        console.error("Could not find productIdInput element to prefill.");
    }
}

// Function to display warehouse stock cards
function displayWarehouseStock(item: any) {
    const displayDiv = document.getElementById('warehouseStockDisplay');
    if (!displayDiv) {
        console.error("warehouseStockDisplay element not found");
        return;
    }

    displayDiv.innerHTML = ''; // Clear previous results
    displayDiv.style.display = 'none'; // Hide initially

    if (!item || !Array.isArray(item.warehouseStock) || item.warehouseStock.length === 0) {
        console.log("No warehouse stock data to display for item:", item?.id); // DEBUG
        return;
    }

    console.log("Displaying warehouse stock for:", item.id); // DEBUG

    // Show the warehouse display section
    displayDiv.style.display = 'grid';

    // Add a header card
    const headerCard = document.createElement('div');
    headerCard.className = 'card';
    headerCard.style.gridColumn = '1 / -1';
    headerCard.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">Warehouse Distribution</h3>
            <p class="card-description">Stock levels across all locations</p>
            <br>
        </div>
    `;
    displayDiv.appendChild(headerCard);

    item.warehouseStock.forEach((whStock: any) => {
        const card = document.createElement('div');
        card.className = 'warehouse-card fade-in'; // Base class with animation

        // Determine stock level class - intentionally basic logic
        let stockClass = 'stock-out'; // Default to red
        let badgeClass = 'badge-destructive';
        let statusText = 'Out of Stock';

        if (whStock.stock > 1) {
            stockClass = 'stock-ok'; // Green
            badgeClass = 'badge-success';
            statusText = 'In Stock';
        } else if (whStock.stock === 1) {
            stockClass = 'stock-low'; // Orange
            badgeClass = 'badge-warning';
            statusText = 'Low Stock';
        }
        card.classList.add(stockClass);

        // Add content with modern styling
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h5 style="margin: 0; font-size: 0.875rem; font-weight: 600;">${whStock.warehouse || 'Unknown Warehouse'}</h5>
                <span class="badge ${badgeClass}">${statusText}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Stock Level</span>
                <span style="font-size: 1.25rem; font-weight: 600; color: hsl(var(--card-foreground));">${whStock.stock}</span>
            </div>
        `;
        displayDiv.appendChild(card);
    });
}


// Renamed and updated function for inventory lookup
function lookupStock() {
    console.log("lookupStock called"); // DEBUG
    let productIdInput: any = document.getElementById('productIdInput');
    let outputDiv: any = document.getElementById('output');
    let warehouseDisplayDiv: any = document.getElementById('warehouseStockDisplay'); // Get warehouse display div

    // Clear previous warehouse results immediately
    if (warehouseDisplayDiv) {
        warehouseDisplayDiv.innerHTML = '';
    } else {
         console.error("warehouseStockDisplay element not found for clearing");
    }


    // Basic input validation
    if (!productIdInput || !productIdInput.value) {
        console.log("Input validation failed: No input value."); // DEBUG
        outputDiv.innerText = translations?.inventoryForm?.output?.errorInputMissing || 'Error: Please enter a Product ID.';
        return;
    }

    const productIdToFind = productIdInput.value.trim();
    console.log("Looking for Product ID:", productIdToFind); // DEBUG

    // Ensure inventoryData is an array before searching
    if (!Array.isArray(inventoryData)) {
        console.error("Inventory data is not an array:", inventoryData); // DEBUG
        outputDiv.innerText = "Error: Inventory data failed to load.";
        return;
    }

    // Find item (case-insensitive search - could be improved)
    const foundItem = inventoryData.find((item: any) => item && item.id && item.id.toLowerCase() === productIdToFind.toLowerCase());
    console.log("Found item:", foundItem); // DEBUG

    if (foundItem) {
        // Create modern styled success display
        let stockBadge = 'badge-success';
        let stockStatus = 'In Stock';
        if (foundItem.stock === 0) {
            stockBadge = 'badge-destructive';
            stockStatus = 'Out of Stock';
        } else if (foundItem.stock <= 5) {
            stockBadge = 'badge-warning';
            stockStatus = 'Low Stock';
        }

        outputDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div style="flex-shrink: 0;">
                    <img src="${getProductImagePath(foundItem.id)}"
                         alt="${foundItem.name}"
                         style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; border: 1px solid hsl(var(--border));"
                         onerror="handleImageError(this, '${foundItem.id}')">
                </div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: hsl(var(--success));">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span style="font-weight: 600; color: hsl(var(--card-foreground));">${foundItem.name}</span>
                        <span class="badge ${stockBadge}">${stockStatus}</span>
                    </div>
                    <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">
                        Product ID: ${foundItem.id}
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: hsl(var(--card-foreground));">${foundItem.stock}</div>
                    <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Total Units</div>
                </div>
            </div>
        `;
        console.log("Output set to: Success display"); // DEBUG

        // Display warehouse stock details
        displayWarehouseStock(foundItem);

    } else {
        // Create modern styled error display
        outputDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem; color: hsl(var(--destructive));">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <div>
                    <div style="font-weight: 600;">Product not found</div>
                    <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">
                        Please check the Product ID and try again
                    </div>
                </div>
            </div>
        `;
        console.log("Output set to: Not Found display"); // DEBUG
        // Ensure warehouse display is cleared if item not found
        if (warehouseDisplayDiv) {
            warehouseDisplayDiv.innerHTML = '';
            warehouseDisplayDiv.style.display = 'none';
        }
    }
}

// Function to populate the inventory list in the UI
function populateInventoryList() {
    const listDiv = document.getElementById('inventoryList');
    if (!listDiv) {
        console.error("Could not find inventoryList element.");
        return;
    }
    if (!Array.isArray(inventoryData) || inventoryData.length === 0) {
        listDiv.innerHTML = '<div style="color: hsl(var(--muted-foreground)); font-size: 0.75rem; text-align: center; padding: 1rem;">No inventory items loaded.</div>';
        return;
    }

    listDiv.innerHTML = ''; // Clear previous list items
    inventoryData.forEach((item: any) => {
        if (item && item.id && item.name) {
            const button = document.createElement('button');
            button.className = 'inventory-item'; // Modern styling
            button.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <img src="${getProductImagePath(item.id)}"
                         alt="${item.name}"
                         style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px; border: 1px solid hsl(var(--border)); flex-shrink: 0;"
                         onerror="handleImageError(this, '${item.id}')">
                    <div style="flex: 1; text-align: left;">
                        <div style="font-weight: 500; font-size: 0.875rem;">${item.name}</div>
                        <div style="font-size: 0.6rem; opacity: 0.7; margin-top: 0.125rem;">${item.id}</div>
                    </div>
                </div>
            `;
            button.onclick = () => prefillSku(item.id);
            listDiv.appendChild(button);
        }
    });
    console.log("Inventory list populated."); // DEBUG
}


// Initialize on window load
window.onload = function() {
    console.log("window.onload executing"); // DEBUG
    loadTranslations();
    loadInventoryData();

    populateInventoryList(); // Populate the list after loading data

    // Check if translations loaded before trying to use them for UI text
    if (translations && translations.inventoryForm) {
        console.log("Applying translations to UI"); // DEBUG
        const titleElement = document.getElementById('formTitle');
        if (titleElement) {
            titleElement.innerText = translations.inventoryForm.title;
        }

        const lookupBtn = document.getElementById('lookupBtn');
        if (lookupBtn) {
            lookupBtn.innerText = translations.inventoryForm.lookupButton;
            lookupBtn.onclick = lookupStock; // Assign lookup function
            console.log("Attached lookupStock to lookupBtn"); // DEBUG
        } else {
             console.error("lookupBtn not found!"); // DEBUG
        }

    } else {
        console.error("Translations not loaded correctly, UI might not be fully translated.");
        // Fallback: still attach lookup function if button exists
        const lookupBtn = document.getElementById('lookupBtn');
        if (lookupBtn) {
            lookupBtn.onclick = lookupStock;
             console.log("Attached lookupStock to lookupBtn (fallback)"); // DEBUG
        } else {
            console.error("lookupBtn not found! (fallback)"); // DEBUG
        }
    }
    console.log("window.onload finished"); // DEBUG
};
