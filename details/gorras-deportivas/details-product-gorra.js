document.addEventListener('DOMContentLoaded', function() {
    // Obtén los parámetros de la URL (nombre, precio, imagen, y descripción)
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = parseFloat(urlParams.get('price'));
    const productImg = urlParams.get('img');
    const productDescription = urlParams.get('description');

    // Rutas de las imágenes de los diferentes colores de gorras
    const images = {
        red:   '../img/gorra-roja.png',
        black: '../img/gorra-negro.png',
        white: '../img/gorra-minimalista.png',
    };

    // Imagen predeterminada del producto
    const productImgPath = `../${productImg}`;
    const productImgElement = document.getElementById('product-img');

    // Actualiza el contenido de la página con los datos del producto
    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-price').textContent = `S/${productPrice}`;
    productImgElement.src = productImgPath;
    document.getElementById('product-description').textContent = productDescription;

    // Selección de color
    let selectedColor = 'red'; // color por defecto
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedColor = this.getAttribute('data-color');
            productImgElement.src = images[selectedColor];
        });
    });

    // Botón para agregar al carrito
    const addToCartBtn = document.querySelector('.btn-add-cart');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(productName, productPrice, images[selectedColor], quantity, selectedColor);
    });

    // Función para agregar productos al carrito
    function addToCart(name, price, img, quantity, color) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cartItems.findIndex(item => item.name === name && item.color === color);

        if (productIndex > -1) {
            cartItems[productIndex].quantity += quantity; // Si ya existe, solo aumentamos la cantidad
        } else {
            cartItems.push({
                name,
                price,
                img,
                quantity,
                color
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartPanel();
    }



    // Función para actualizar el panel del carrito
function updateCartPanel() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Limpiar los items anteriores
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.img}" alt="${item.name}">
                <div class="details">
                    <p>${item.name} - ${item.color}</p>
                </div>
                <div class="subtotal">Subtotal: S/${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="quantity-remove">
                <div class="quantity">
                    <button class="quantity-decrease" data-index="${index}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    cartCount.textContent = cartItems.length;  // Actualiza el contador del carrito
    cartTotal.textContent = `S/${totalPrice.toFixed(2)}`;

    // Agregar eventos a los botones de cantidad y eliminar
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            updateQuantity(index, 1); // Aumentar cantidad
        });
    });

    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            updateQuantity(index, -1); // Disminuir cantidad
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeItem(index); // Eliminar producto
        });
    });
}


    // Función para actualizar la cantidad de un producto
    function updateQuantity(index, change) {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        if (cartItems[index].quantity + change > 0) {
            cartItems[index].quantity += change;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartPanel(); // Actualiza el panel después de la modificación
        }
    }

    // Función para eliminar un producto del carrito
    function removeItem(index) {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        cartItems.splice(index, 1); // Eliminar el producto
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartPanel(); // Actualiza el panel después de la eliminación
    }

    // Mostrar/Ocultar el carrito al hacer clic en el ícono
    const cartIcon = document.getElementById('cart-icon');
    const cartPanel = document.getElementById('cart-panel');
    
    cartIcon.addEventListener('click', function() {
        cartPanel.style.display = cartPanel.style.display === 'none' || cartPanel.style.display === '' ? 'block' : 'none';
    });

    // Llamar a updateCartPanel cuando se carga la página para mostrar los productos almacenados
    updateCartPanel();
});
