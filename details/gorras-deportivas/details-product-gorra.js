document.addEventListener('DOMContentLoaded', function() {
    // Obtén los parámetros de la URL (nombre, precio, imagen, y descripción)
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImg = urlParams.get('img');
    const productDescription = urlParams.get('description');

    // Rutas de las imágenes de los diferentes colores de gorras
    const images = {
        red:   '../img/gorra-roja.png',
        black: '../img/gorra-negro.png',
        white: '../img/gorra-minimalista.png',  // Asegúrate de tener esta imagen en la carpeta ../img/
    };

    // Imagen predeterminada del producto (la que viene en la URL)
    const productImgPath = `../${productImg}`;  // Va un nivel arriba para llegar a la carpeta img
    const productImgElement = document.getElementById('product-img');

    // Actualiza el contenido de la página con los datos del producto
    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-price').textContent = `S/${productPrice}`;
    productImgElement.src = productImgPath;

    // Actualiza la descripción del producto
    document.getElementById('product-description').textContent = productDescription;

    // Selección de color
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Agrega un event listener a cada opción de color para cambiar la imagen
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedColor = this.getAttribute('data-color');  // Obtiene el color seleccionado
            if (images[selectedColor]) {
                productImgElement.src = images[selectedColor];  // Cambia la imagen del producto
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
