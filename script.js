const products = [
    {
        id: 1,
        name: "Camiseta Oversize Drop CyberSigilism",
        price: "$119.750 COP - $28.73 USD",
        description: "Camiseta oversize con diseño exclusivo CyberSigilism. Confeccionada con algodón 100% orgánico de alta calidad. Corte holgado para un estilo urbano contemporáneo y máxima comodidad.",
        images: [
            "/1.png",
            "/2.png",
            "/3.png",
        ]
    },
    {
        id: 2,
        name: "Camiseta Oversize CyberSigilism Negra",
        price: "$119.750 COP - $28.73 USD",
        description: "Camiseta oversize con diseño exclusivo CyberSigilism. Confeccionada con algodón 100% orgánico de alta calidad. Corte holgado para un estilo urbano contemporáneo y máxima comodidad.",
        images: [
            "/5.png",
            "/6.png",
            "/7.png",
        ]
    },
    {
        id: 3,
        name: "Sudadera Esencial",
        price: "€79.99",
        description: "Sudadera básica de alta calidad con corte relajado. Tejido de algodón suave al tacto con interior cepillado para mayor calidez. Una pieza esencial para cualquier armario que nunca pasa de moda.",
        images: [
            "/api/placeholder/600/800?text=Frontal",
            "/api/placeholder/600/800?text=Lateral",
            "/api/placeholder/600/800?text=Trasero",
            "/api/placeholder/600/800?text=Detalle"
        ]
    },
    {
        id: 4,
        name: "Abrigo Minimalista",
        price: "€199.99",
        description: "Abrigo de corte limpio y minimalista con silueta estructurada. Confeccionado con lana de alta calidad y forrado para una mayor protección contra el frío. Un básico atemporal para los meses de invierno.",
        images: [
            "/api/placeholder/600/800?text=Frontal",
            "/api/placeholder/600/800?text=Lateral",
            "/api/placeholder/600/800?text=Trasero",
            "/api/placeholder/600/800?text=Detalle"
        ]
    },
    {
        id: 5,
        name: "Jersey de Punto",
        price: "€69.99",
        description: "Jersey de punto grueso con textura única y cuello redondo. Fabricado con mezcla de lana y algodón para una sensación cálida y suave. Perfecto para crear looks de capas durante el otoño e invierno.",
        images: [
            "/api/placeholder/600/800?text=Frontal",
            "/api/placeholder/600/800?text=Lateral",
            "/api/placeholder/600/800?text=Trasero",
            "/api/placeholder/600/800?text=Detalle"
        ]
    },
    {
        id: 6,
        name: "Botas de Cuero",
        price: "€159.99",
        description: "Botas de cuero premium con suela resistente y detalles metálicos. Cuero tratado para resistir la humedad y mantener su aspecto impecable con el paso del tiempo. Un complemento ideal para cualquier look.",
        images: [
            "/api/placeholder/600/800?text=Frontal",
            "/api/placeholder/600/800?text=Lateral",
            "/api/placeholder/600/800?text=Trasero",
            "/api/placeholder/600/800?text=Detalle"
        ]
    }
];

// Variables para el carrito
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

// Modal de producto
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const sizeOptions = document.querySelectorAll('.size-option');
const addToCartButton = document.querySelector('.add-to-cart');
const thumbnailContainer = document.getElementById('thumbnailContainer');
const prevButton = document.querySelector('.prev-image');
const nextButton = document.querySelector('.next-image');

// Variables para la galería
let currentProductId = null;
let currentImageIndex = 0;

// Mostrar detalles del producto en el modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        currentProductId = productId;
        currentImageIndex = 0;
        
        // Actualizar información del producto
        modalTitle.textContent = product.name;
        modalPrice.textContent = product.price;
        modalDescription.textContent = product.description;
        
        // Configurar la galería de imágenes
        setupGallery(product.images);
        
        // Mostrar el modal
        modal.style.display = 'block';
    }
}

// Configurar la galería de imágenes
function setupGallery(images) {
    // Actualizar imagen principal
    modalImage.src = images[currentImageIndex];
    
    // Limpiar y crear miniaturas
    thumbnailContainer.innerHTML = '';
    
    images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `Vista ${index + 1}`;
        thumbnail.classList.add('thumbnail');
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery(images);
        });
        
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Actualizar visibilidad de botones de navegación
    updateNavigationButtons(images);
}

// Actualizar la galería cuando cambia la imagen seleccionada
function updateGallery(images) {
    // Actualizar imagen principal
    modalImage.src = images[currentImageIndex];
    
    // Actualizar miniaturas activas
    const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
    
    // Actualizar visibilidad de botones de navegación
    updateNavigationButtons(images);
}

// Actualizar visibilidad de botones de navegación
function updateNavigationButtons(images) {
    prevButton.style.visibility = currentImageIndex > 0 ? 'visible' : 'hidden';
    nextButton.style.visibility = currentImageIndex < images.length - 1 ? 'visible' : 'hidden';
}

// Navegar a la imagen anterior
function prevImage() {
    const product = products.find(p => p.id === currentProductId);
    if (product && currentImageIndex > 0) {
        currentImageIndex--;
        updateGallery(product.images);
    }
}

// Navegar a la siguiente imagen
function nextImage() {
    const product = products.find(p => p.id === currentProductId);
    if (product && currentImageIndex < product.images.length - 1) {
        currentImageIndex++;
        updateGallery(product.images);
    }
}

// Añadir evento de clic a las tarjetas de producto
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const productId = parseInt(card.dataset.id);
        showProductDetails(productId);
    });
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Eventos de navegación de la galería
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Selección de talla
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Quitar la clase selected de todas las opciones
        sizeOptions.forEach(o => o.classList.remove('selected'));
        // Añadir la clase selected a la opción clickeada
        option.classList.add('selected');
    });
});

// Añadir al carrito
addToCartButton.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-option.selected');
    
    if (!selectedSize) {
        alert('Por favor, selecciona una talla');
        return;
    }
    
    cartCount++;
    // Crear elemento de contador si no existe
    if (!document.querySelector('.cart-count')) {
        const cartCountElement = document.createElement('div');
        cartCountElement.className = 'cart-count';
        document.querySelector('.cart-icon').appendChild(cartCountElement);
    }
    // Actualizar el contador
    document.querySelector('.cart-count').textContent = cartCount;
    
    alert(`Producto añadido al carrito con talla ${selectedSize.dataset.size}`);
    modal.style.display = 'none';
});

// Botón Shop Now
document.querySelector('.shop-now').addEventListener('click', () => {
    // Desplazarse a la sección de Nuevas Llegadas
    document.querySelector('.section-title').scrollIntoView({ behavior: 'smooth' });
});