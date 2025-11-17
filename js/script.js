// =========================================================
// 1. GLOBAL DATA & HELPER FUNCTIONS
// =========================================================

const dashboardData = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000,
};

let productsData = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Cokelat Aceh", price: 30000, stock: 10 },
];

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}


// =========================================================
// 2. LOGIN LOGIC
// =========================================================

function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('errorMessage');

        if (email === '' || password === '') {
            errorMessage.textContent = 'Email dan Password tidak boleh kosong!';
        
        } else {
            errorMessage.textContent = '';
            alert('Login berhasil');
            window.location.href = 'dashboard.html';
        

        }

    });
}


// =========================================================
// 3. DASHBOARD LOGIC
// =========================================================

function renderDashboard() {
    if (!document.getElementById('totalProducts')) return;

    document.getElementById('totalProducts').textContent = dashboardData.totalProducts;
    document.getElementById('totalSales').textContent = dashboardData.totalSales;
    document.getElementById('totalRevenue').textContent = formatRupiah(dashboardData.totalRevenue);
}


// =========================================================
// 4. PRODUCTS LOGIC
// =========================================================

function renderProductTable() {
    const tableBody = document.getElementById('productTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    productsData.forEach((product, index) => {
        const row = tableBody.insertRow();
        row.id = `row-${product.id}`;

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td class="text-right">${formatRupiah(product.price)}</td>
            <td class="text-center">${product.stock}</td>
            <td class="action-cell">
                <button class="action-btn edit-btn" data-id="${product.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn" data-id="${product.id}">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        `;
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDelete);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', handleEdit);
    });
}

function handleEdit(event) {
    const id = event.currentTarget.getAttribute('data-id');
    const product = productsData.find(p => p.id == id);

    if (product) {
        alert(`Fungsi Edit untuk produk: ${product.name} akan dikembangkan.`);
    }
}

function handleDelete(event) {
    const id = parseInt(event.currentTarget.getAttribute('data-id'));
    const index = productsData.findIndex(p => p.id === id);

    if (index > -1 && confirm("Yakin ingin menghapus produk ini?")) {

        productsData.splice(index, 1);

        const rowElement = document.getElementById(`row-${id}`);
        if (rowElement) rowElement.remove();

        renderProductTable();

        alert("Produk berhasil dihapus!");
    }
}


// =========================================================
// 5. INITIALIZATION
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;

    if (pathname.includes('index.html') || pathname === '/') {
        handleLogin();
    } else if (pathname.includes('dashboard.html')) {
        renderDashboard();
    } else if (pathname.includes('products.html')) {
        renderProductTable();
    }
});
