import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

// ProductProvider es un componente que envuelve a todos los componentes que necesitan acceder al estado de los productos
export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);  // Estado para almacenar los productos
    const [isLoading, setIsLoading] = useState(true);  // Estado para controlar si se están cargando los productos
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando un producto

    //producto seleccionado
    const [selectedProduct, setSelectedProduct] = useState(null);

    //transacciones
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const openTransactionModal = (productId) => {
        setSelectedProduct(productId);
        setIsTransactionModalOpen(true);
    };

    const closeTransactionModal = () => {
        console.log('Closing transaction modal...');
        setIsTransactionModalOpen(false);
    };

    //detalles
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const openDetailsModal = (product) => {
        setSelectedProduct(product);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        console.log('Closing details modal...');
        setSelectedProduct(null);
        setIsDetailsModalOpen(false);
    };

    //edicion
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
    };

    // Función para obtener los productos desde la base de datos
    const fetchProducts = async () => {
        try {
            await new Promise(resolve => {
                setTimeout(resolve, 3000);
            });
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get`);
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProducts(data);
            setIsLoading(false); // Establece isLoading en false cuando se obtienen los productos
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            await response.json();
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)); // Elimina el producto del estado local, sin necesidad de volver a obtener los productos desde la base de datos.
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const updateProduct = async (id, updatedData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Envía los datos actualizados como JSON en el cuerpo de la solicitud
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            // Actualiza el producto en el estado local con los datos actualizados
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? { ...product, ...updatedData } : product // Si el id del producto coincide con el id del producto actualizado, devuelve el producto actualizado, de lo contrario devuelve el producto sin cambios
                )
            );
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <ProductContext.Provider value={{ products, setIsLoading, isLoading, selectedProduct, isDetailsModalOpen, isEditModalOpen, openDetailsModal, closeDetailsModal, openEditModal, closeEditModal, fetchProducts, deleteProduct, updateProduct, isEditing, setIsEditing, openTransactionModal, closeTransactionModal, isTransactionModalOpen }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext); // Retorna el contexto de productos
}