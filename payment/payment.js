document.addEventListener('DOMContentLoaded', () => {
    // Obtener el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoDetalles = document.getElementById('producto-detalles');
    const carritoTotal = document.getElementById('carrito-total');
    let total = 0;

    if (carrito.length === 0) {
        // Mostrar un mensaje si no hay productos en el carrito
        productoDetalles.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        // Mostrar los productos seleccionados en la página de pago
        carrito.forEach(item => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto-detalle');
            productoElemento.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="producto-img">
                <div>
                    <p><strong>Producto:</strong> ${item.name}</p>
                    <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                    <p><strong>Subtotal:</strong> S/ ${(item.subtotal).toFixed(2)}</p>
                </div>
            `;
            productoDetalles.appendChild(productoElemento);

            // Actualizar el total del carrito
            total += item.subtotal;
        });

        // Mostrar el total del carrito en la página de pago
        carritoTotal.textContent = `S/ ${total.toFixed(2)}`;
    }

    // Procesar el pago
    const formularioPago = document.getElementById('formulario-pago');
    formularioPago.addEventListener('submit', (e) => {
        e.preventDefault();

        // Capturar los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const direccion = document.getElementById('direccion').value;

        // Aquí podrías enviar estos datos a tu servidor para procesar el pago
        console.log({
            nombre,
            email,
            direccion,
            carrito
        });

        // Simular el éxito del pago
        alert("Pago realizado exitosamente.");

        // Limpiar el carrito y redirigir
        localStorage.removeItem('carrito'); // Vaciar el carrito tras el pago
        window.location.href = "index.html"; // Redirigir al usuario al inicio
    });
});
