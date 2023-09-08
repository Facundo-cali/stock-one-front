import { useState } from 'react';

function create() {
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        code: '',
        quantity: '',
        price: '',
        description: '',
    });

    const handleChange = (e) => {
        // Actualizar producto ([e.target.name]: e.target.value significa que el valor de la propiedad name del estado del producto será igual al valor del campo de entrada)
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mostrar el indicador de carga
        setIsLoading(true);
        // Llamar a la función proporcionada para agregar el producto
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Producto agregado con éxito:', data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });


        // Limpiar el formulario
        setProduct({
            name: '',
            code: '',
            quantity: '',
            price: '',
            description: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Añadir Producto al Stock</h2>
            <label>
                Nombre del Producto:
                <input
                    type="text"
                    value={product.name}
                    name='name'
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Código del Producto:
                <input
                    type="text"
                    value={product.code}
                    name='code'
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Cantidad:
                <input
                    type="number"
                    value={product.quantity}
                    name='quantity'
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Precio Unitario:
                <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    name='price'
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Descripción:
                <textarea
                    value={product.description}
                    name='description'
                    onChange={handleChange}
                />
            </label>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Creando producto' : 'Crear producto'}</button>
        </form>
    );
}

export default create