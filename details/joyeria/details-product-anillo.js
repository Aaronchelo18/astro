document.addEventListener('DOMContentLoaded', function() {
    // Obtén los parámetros de la URL (nombre, precio, imagen, y descripción)
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImg = urlParams.get('img');
    const productDescription = urlParams.get('description');

    // Rutas de las imágenes para los diferentes kilates (o pesos)
    const images = {
        '10k': '/img/anillo-10k.png',   // Asegúrate de tener estas imágenes en la carpeta ../img/
        '14k': '/img/anillo-14k.png',
        '18k': '/img/anillo-18k.png',
    };

    // Imagen predeterminada del producto (la que viene en la URL)
    const productImgPath = `${productImg}`;  // Va un nivel arriba para llegar a la carpeta img
    const productImgElement = document.getElementById('product-img');

    // Actualiza el contenido de la página con los datos del producto
    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-price').textContent = `S/${productPrice}`;
    productImgElement.src = productImgPath;

    // Actualiza la descripción del producto
    document.getElementById('product-description').textContent = productDescription;

    // Selección de kilates
    const weightOptions = document.querySelectorAll('.kilate-option');
    
    // Agrega un event listener a cada opción de peso (kilates) para cambiar la imagen
    weightOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedWeight = this.getAttribute('data-weight');  // Obtiene el peso (kilates) seleccionado
            if (images[selectedWeight]) {
                productImgElement.src = images[selectedWeight];  // Cambia la imagen del producto
            }
        });
    });
});

document.getElementById('increase-btn').addEventListener('click', function() {
    let quantity = document.getElementById('quantity');
    quantity.value = parseInt(quantity.value) + 1;
});

document.getElementById('decrease-btn').addEventListener('click', function() {
    let quantity = document.getElementById('quantity');
    if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;
    }
});



