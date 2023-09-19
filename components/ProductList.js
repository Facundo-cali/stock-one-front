import { useProduct } from './ProductContext';
import { useState } from 'react';
import Modal from 'react-modal';


function ViewProducts() {
    const { products, isLoading, deleteProduct, setIsLoading, updateProduct } = useProduct();
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);

    // Función para eliminar un producto
    const handleDelete = async (id) => {
        const confirmed = window.confirm("¿Seguro que deseas eliminar este producto?");
        if (!confirmed) {
            return; // Si el usuario cancela la eliminación, no hacemos nada.
        }
        try {
            setIsLoading(true);
            await deleteProduct(id);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al borrar el producto:', error);
            setIsLoading(false);
        }
    };

    // Función para editar un producto
    const handleEdit = (id) => {
        setIsEditing(true);
        const product = products.find((product) => product._id === id);
        setEditedProduct(product);
    };

    // Función para guardar los cambios de un producto editado
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateProduct(editedProduct._id, editedProduct);// Actualiza el producto en la base de datos
            setIsLoading(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setIsLoading(false);
        }
    };

    // Función para manejar cambios en los campos de edición
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        // Actualiza el producto editado en tiempo real
        setEditedProduct((prevEditedProduct) => ({
            ...prevEditedProduct,
            [name]: value,
        }));
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
                                    <button className="edit-button" onClick={() => handleEdit(product._id)}>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal
                isOpen={isEditing}
                onRequestClose={() => setIsEditing(false)} // Cierra la ventana modal al hacer clic en "Cerrar" o fuera de ella
                className="custom-modal"
            >
                <div className="edit-form">
                    <h2>Editar Producto</h2>
                    {editedProduct && (
                        <form>
                            <label>
                                Nombre del Producto:
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Código del Producto:
                                <input
                                    type="text"
                                    name="code"
                                    value={editedProduct.code}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Cantidad:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={editedProduct.quantity}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Precio Unitario:
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Descripción:
                                <textarea
                                    name="description"
                                    value={editedProduct.description}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <div className="centered-button">
                                <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
                            </div>
                        </form>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default ViewProducts;