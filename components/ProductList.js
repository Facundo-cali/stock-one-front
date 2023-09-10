import { useProduct } from './ProductContext';

function ViewProducts() {
    const { products, isLoading } = useProduct();

    return (
        <div className={`table-container ${isLoading ? 'hide-scroll-bar' : ''}`}>
            {isLoading ? (
                <div className="spinner" id="my-spinner"></div>
            ) : (
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
            )}
        </div>
    );
}

export default ViewProducts;