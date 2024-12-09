document.addEventListener('DOMContentLoaded', () => {
    const botonPagar = document.getElementById('checkout');

    // Verificar si hay un carrito en el localStorage o inicializarlo como un array vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar un evento al botón "Pagar"
    botonPagar.addEventListener('click', () => {
        // Aquí puedes modificar el contenido de 'carrito' según lo que se quiera agregar
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Redirigir a la página de pago
        window.location.href = 'payment/payment.html';  // Ajustar la ruta según sea necesario
    });
});
    