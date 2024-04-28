import React from 'react';
import Modal from 'react-modal';
import { useProduct } from '../components/ProductContext';

function EditModal({ isOpen, onRequestClose, editedProduct, handleEditChange }) {

    const { updateProduct, setIsLoading, closeDetailsModal, setIsEditing } = useProduct();

    // Función para guardar los cambios de un producto editado
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateProduct(editedProduct._id, editedProduct);// Actualiza el producto en la base de datos
            setIsLoading(false);
            setIsEditing(false);
            console.log('Saving product...');
            closeDetailsModal(); // Cerramos el modal de detalles después de guardar los cambios
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="custom-modal"
        >
            <div className="edit-form">
                <h2>Editar Producto</h2>
                {editedProduct && (
                    <form>
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
                            <p> Nombre del Producto: {editedProduct.name}</p>
                        </label>
                        <label>
                            <p>Entró: {editedProduct.entro}</p>
                        </label>
                        <label>
                            <p>Salió: {editedProduct.salio}</p>
                        </label>
                        <label>
                            <p>En Mano: {editedProduct.enmano}</p>
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
                            <p>Precio Total: {editedProduct.preciototal}</p>
                        </label>
                        <div className="centered-button">
                            <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}

export default EditModal;