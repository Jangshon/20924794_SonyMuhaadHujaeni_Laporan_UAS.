document.addEventListener('DOMContentLoaded', () => {
    const filterSelect = document.getElementById('filter');
    const shoeItems = document.querySelectorAll('.shoe-item');
    const navLinks = document.querySelectorAll('nav .nav-links a');
    const sections = document.querySelectorAll('main .section');
    const cartItemsContainer = document.getElementById('cartItems');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    let cart = [];

    // Filter shoes by category
    filterSelect.addEventListener('change', () => {
        const selectedCategory = filterSelect.value;

        shoeItems.forEach(item => {
            if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Navigation link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.dataset.section;

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target section, hide others
            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Add to cart button click handler
    shoeItems.forEach(item => {
        const btn = item.querySelector('.add-to-cart-btn');
        btn.addEventListener('click', () => {
            const name = item.dataset.name;
            const price = parseInt(item.dataset.price);

            const existingItem = cart.find(ci => ci.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCartUI();
            alert(`${name} berhasil ditambahkan ke keranjang.`);
        });
    });

    // Update cart UI
    function updateCartUI() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjang kosong.</p>';
            clearCartBtn.style.display = 'none';
            return;
        }

        clearCartBtn.style.display = 'inline-block';

        let html = '';
        cart.forEach(item => {
            html += `
                <div class="cart-item">
                    <span class="cart-item-name">${item.name} (x${item.quantity})</span>
                    <span class="cart-item-price">Rp ${item.price * item.quantity}</span>
                </div>
            `;
        });
        cartItemsContainer.innerHTML = html;
    }

    // Clear cart button handler
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
            cart = [];
            updateCartUI();
        }
    });

    // Contact form submit handler
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Semua field harus diisi.';
            return;
        }

        // For demo, just show success message and reset form
        formMessage.style.color = 'green';
        formMessage.textContent = 'Terima kasih atas pesan Anda!';
        contactForm.reset();
    });

    // Initialize cart UI
    updateCartUI();
});
