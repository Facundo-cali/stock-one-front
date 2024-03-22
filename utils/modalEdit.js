import React from 'react';
import Modal from 'react-modal';
import { useProduct } from '../components/ProductContext';

function ModalComponent({ isOpen, onRequestClose, editedProduct, handleEditChange }) {

    const { updateProduct, setIsLoading, closeDetailsModal, setIsEditing, isEditing } = useProduct();

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
    );
}

export default ModalComponent;