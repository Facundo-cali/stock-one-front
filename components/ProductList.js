import { useProduct } from './ProductContext';

function ViewProducts() {
    const { products, isLoading, deleteProduct, setIsLoading } = useProduct();

    // Función para eliminar un producto
    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await deleteProduct(id);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al borrar el producto:', error);
            setIsLoading(false);
        }
    };

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
                            <th>Acciones</th>
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
                                <td className="actions">
                                    <button className="delete-button" onClick={() => handleDelete(product._id)}>
                                        Borrar
                                    </button>
                                    <button className="edit-button" >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ViewProducts;