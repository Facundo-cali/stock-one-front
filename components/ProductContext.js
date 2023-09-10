import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

// ProductProvider es un componente que envuelve a todos los componentes que necesitan acceder al estado de los productos
export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    // Función para obtener los productos desde la base de datos
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get`);
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext);
}