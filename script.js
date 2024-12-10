document.addEventListener('DOMContentLoaded', () => {
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    const productos = document.querySelectorAll('.btn-comprar');
    const cartCountElement = document.getElementById('cart-count'); // Elemento para el contador
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recuperar carrito del localStorage o inicializarlo vacío

    // Función para actualizar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        cartCountElement.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    }

    // Función para actualizar el total del carrito
    function actualizarTotal() {
        const total = carrito.reduce((total, item) => total + item.subtotal, 0);
        carritoTotal.innerText = `S/${total.toFixed(2)}`;
    }

    // Mostrar el carrito al cargar la página si hay productos en localStorage
    function cargarCarrito() {
        carrito.forEach(producto => {
            agregarProductoAlCarritoUI(producto);
        });
        actualizarTotal();
        updateCartCount();
    }

    // Función para añadir un producto al carrito en la interfaz
    function agregarProductoAlCarritoUI(producto) {
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <img src="${producto.img}" alt="${producto.name}" class="carrito-img">
            <div>
                <p>${producto.name}</p>
                <p>Subtotal: S/<span class="subtotal">${producto.subtotal.toFixed(2)}</span></p>
            </div>
            <div class="carrito-item-controls">
                <button class="decrementar">-</button>
                <span class="cantidad">${producto.cantidad}</span>
                <button class="incrementar">+</button>
                <button class="eliminar">Eliminar</button>
            </div>
        `;
        carritoItems.appendChild(item);

        // Lógica para incrementar, decrementar y eliminar
        const incrementarBtn = item.querySelector('.incrementar');
        const decrementarBtn = item.querySelector('.decrementar');
        const cantidadElement = item.querySelector('.cantidad');
        const subtotalElement = item.querySelector('.subtotal');
        const eliminarBtn = item.querySelector('.eliminar');

        incrementarBtn.addEventListener('click', () => {
            producto.cantidad++;
            producto.subtotal = producto.price * producto.cantidad; // Actualizar subtotal
            cantidadElement.innerText = producto.cantidad;
            subtotalElement.innerText = producto.subtotal.toFixed(2);

            guardarCarrito(); // Guardar en localStorage
            actualizarTotal();
            updateCartCount();
        });

        decrementarBtn.addEventListener('click', () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
                producto.subtotal = producto.price * producto.cantidad; // Actualizar subtotal
                cantidadElement.innerText = producto.cantidad;
                subtotalElement.innerText = producto.subtotal.toFixed(2);

                guardarCarrito(); // Guardar en localStorage
                actualizarTotal();
                updateCartCount();
            }
        });

        eliminarBtn.addEventListener('click', () => {
            carrito = carrito.filter(item => item.name !== producto.name);
            item.remove();
            guardarCarrito(); // Guardar en localStorage
            actualizarTotal();
            updateCartCount();

            if (carrito.length === 0) {
                carritoPanel.classList.remove('active');
            }
        });
    }

    // Manejo del evento de añadir al carrito
    productos.forEach(producto => {
        producto.addEventListener('click', (e) => {
            const productElement = e.target.closest('.producto');
            const productName = productElement.dataset.name;
            const productPrice = parseFloat(productElement.dataset.price);
            const productImg = productElement.querySelector('img').src;

            let productoExistente = carrito.find(item => item.name === productName);

            if (productoExistente) {
                mostrarMensaje(`${productName} ya está en tu carrito.`);
                return;
            }

            const nuevoProducto = { 
                name: productName, 
                price: productPrice, 
                img: productImg, 
                cantidad: 1, 
                subtotal: productPrice // Inicialmente el subtotal es igual al precio
            };
            carrito.push(nuevoProducto);

            agregarProductoAlCarritoUI(nuevoProducto);

            guardarCarrito(); // Guardar en localStorage
            actualizarTotal();
            updateCartCount();
            carritoPanel.classList.add('active');
        });
    });

    // Cargar el carrito al iniciar
    cargarCarrito();

    // Cerrar el carrito
    cerrarCarritoBtn.addEventListener('click', () => {
        carritoPanel.classList.remove('active');
    });

    // Función para mostrar un mensaje con animación
    function mostrarMensaje(message) {
        const existingMessage = document.querySelector('.mensaje');
        if (existingMessage) {
            existingMessage.remove();
        }

        const mensajeElemento = document.createElement('div');
        mensajeElemento.classList.add('mensaje');
        mensajeElemento.innerText = message;
        document.body.appendChild(mensajeElemento);

        setTimeout(() => {
            mensajeElemento.classList.add('show');
        }, 10);

        setTimeout(() => {
            mensajeElemento.classList.remove('show');
            setTimeout(() => {
                mensajeElemento.remove();
            }, 500);
        }, 1000);
    }
});

document.getElementById('cart-icon').addEventListener('click', function(e) {
    e.preventDefault();  // Esto previene el comportamiento por defecto del enlace
});

document.addEventListener('DOMContentLoaded', () => {
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const cartIcon = document.getElementById('cart-icon');

    // Abrir el panel del carrito cuando se hace clic en el ícono del carrito
    cartIcon.addEventListener('click', () => {
        carritoPanel.classList.toggle('active');
    });

    // Cerrar el panel del carrito cuando se hace clic en el botón de cerrar
    cerrarCarritoBtn.addEventListener('click', () => {
        carritoPanel.classList.remove('active');
    });
});


document.querySelectorAll('.producto a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar la acción de clic predeterminada

        // Animar la opacidad del contenedor de la imagen antes de la redirección
        const productImage = link.querySelector('img');
        
        // Agregar clase de transición
        productImage.style.transition = 'opacity 0.1s ease'; // Tiempo de transición de 0.3 segundos

        // Redirigir a la página después de la animación
        setTimeout(() => {
            window.location.href = link.href;
        }, 300); // Sincroniza con la duración de la animación
    });
});
