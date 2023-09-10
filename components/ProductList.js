import { useProduct } from './ProductContext';

function ViewProducts() {
    const { products, isLoading } = useProduct();

    if (isLoading) {
        return <p>Cargando productos...</p>; // Muestra un mensaje de carga mientras isLoading es true
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