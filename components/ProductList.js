import { useProduct } from './ProductContext';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
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

    // Función para manejar cambios en los campos de edición
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        // Actualiza el producto editado en tiempo real
        setEditedProduct((prevEditedProduct) => ({
            ...prevEditedProduct,
            [name]: value,
        }));
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

    return (
        <div className={`product-container ${isLoading ? 'hide-scroll-bar' : ''}`}>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="products">
                    {products.map((product) => (
                        <div className="product" key={product._id}>
                            <div className="product-info">
                                <span className="product-name">{product.name} ({product.code}):</span>
                                <span>Entró: {product.entro}</span>
                                <span>Salió: {product.salio}</span>
                                <span>En Mano: {product.enmano}</span>

                            </div>
                            <div className="actions">
                                <button className="delete-button" onClick={() => handleDelete(product._id)}>
                                    Borrar
                                </button>
                                <button className="edit-button" onClick={() => handleEdit(product._id)}>
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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
                                Entró:
                                <input
                                    type="number"
                                    name="entro"
                                    value={editedProduct.entro}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Salió:
                                <input
                                    type="number"
                                    name="salio"
                                    value={editedProduct.salio}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                En Mano:
                                <input
                                    type="number"
                                    step="0.01"
                                    name="enmano"
                                    value={editedProduct.enmano}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Precio Unidad:
                                <input
                                    type="number"
                                    step="0.01"
                                    name="preciou"
                                    value={editedProduct.preciou}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Precio total:
                                <input
                                    type="number"
                                    step="0.01"
                                    name="preciototal"
                                    value={editedProduct.preciototal}
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