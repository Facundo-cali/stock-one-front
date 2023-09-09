import { useProduct } from './ProductContext';
import { useEffect } from 'react';

function ViewProducts() {
    const { products, fetchProducts } = useProduct();

    useEffect(() => {
        // Si no hay productos en el estado global, obtén los productos de la base de datos, de lo contrario evita que se haga una solicitud cada vez que se renderiza el componente.
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products]);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.code}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProducts;