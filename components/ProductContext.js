import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

// ProductProvider es un componente que envuelve a todos los componentes que necesitan acceder al estado de los productos
export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Agrega una variable de estado isLoading

    // Función para obtener los productos desde la base de datos
    const fetchProducts = async () => {
        try {
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


    return (
        <ProductContext.Provider value={{ products, setProducts, fetchProducts, isLoading, deleteProduct, setIsLoading }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext);
}