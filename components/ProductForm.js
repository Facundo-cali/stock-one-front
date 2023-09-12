import { useState } from 'react';
import { useProduct } from './ProductContext';

function create() {
    const { products, setProducts } = useProduct(); // useProduct() es un hook personalizado que devuelve el contexto de los productos

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }
            console.log('Producto agregado con éxito:');
            // Obtener el nuevo producto desde la base de datos
            const newProduct = await response.json();
            // Agregar el nuevo producto al estado local de productos sin necesidad de volver a obtener los productos desde la base de datos
            setProducts([newProduct, ...products]);

            // Restablecer el formulario o el estado del nuevo producto
            setProduct({
                name: '',
                code: '',
                quantity: '',
                price: '',
                description: '',
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
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

export default create;