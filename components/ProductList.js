import { useProduct } from './ProductContext';

function ViewProducts() {
    const { products } = useProduct();

    // Si no hay productos en el estado global, muestra un mensaje
    if (products.length === 0) {
        return <p>No hay productos en el stock</p>;
    }

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
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProducts;