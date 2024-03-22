import React from 'react';
import Modal from 'react-modal';
import { useProduct } from '../components/ProductContext';
import { useState } from 'react';
import ModalComponent from './modalEdit';

const ProductDetail = ({ product }) => {

    const { deleteProduct, isLoading, setIsLoading, products, isDetailsModalOpen, isEditModalOpen, openDetailsModal, closeDetailsModal, openEditModal, closeEditModal, setIsEditing, isEditing } = useProduct();


    const [editedProduct, setEditedProduct] = useState(null);

    // Función para editar un producto
    const handleEdit = (id) => {
        setIsEditing(true);
        const product = products.find((product) => product._id === id);
        setEditedProduct(product);
        openEditModal(product);
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
            closeModal(); // Cerramos el modal después de eliminar el producto
        } catch (error) {
            console.error('Error al borrar el producto:', error);
            setIsLoading(false);
        }
    };


    return (
        <Modal
            isOpen={isDetailsModalOpen}
            onRequestClose={closeDetailsModal}
            className="custom-modal"
        >
            <div className="edit-form">
                <h2>Detalles del Producto</h2>
                {product && (
                    <div>
                        <p>Nombre: {product.name}</p>
                        <p>Código: {product.code}</p>
                        <p>Entró: {product.entro}</p>
                        <p>Salió: {product.salio}</p>
                        <p>Precio Unidad: {product.preciou}</p>
                        <p>Precio Total: {product.preciototal}</p>
                    </div>
                )}
                <div className="centered-button">
                    <button className="save-button" onClick={closeDetailsModal}>Cerrar</button>
                </div>
                <div className="centered-button">
                    <button className="delete-button" onClick={() => handleDelete(product._id)}>Borrar</button>
                </div>
                <div className="centered-button">
                    <button className="edit-button" onClick={() => { handleEdit(product._id) }}>
                        Editar
                    </button>
                </div>
            </div>
            {/* Renderiza el componente ModalComponent */}
            <ModalComponent
                isOpen={isEditing}
                onRequestClose={() => setIsEditing(false)}
                editedProduct={editedProduct}
                handleEditChange={handleEditChange}
            />
        </Modal>
    );
};

export default ProductDetail;