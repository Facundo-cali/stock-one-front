import React, { useState, useEffect } from 'react';

const TotalesContainer = ({ products }) => {
    const [totals, setTotals] = useState({
        totalProductos: 0,
        totalStockEnMano: 0,
        totalPrecioStock: 0
    });

    useEffect(() => {
        let totalProductos = 0;
        let totalStockEnMano = 0;
        let totalPrecioStock = 0;

        // Recalculate totals when products change
        products.forEach((product) => {
            totalProductos++;
            totalStockEnMano += product.enmano;
            totalPrecioStock += product.enmano * product.preciou;
        });

        // Update state with new totals
        setTotals({
            totalProductos,
            totalStockEnMano,
            totalPrecioStock
        });
    }, [products]);

    return (
        <div className="totales-container">
            <p>Total de Productos: {totals.totalProductos}</p>
            <p>Total de Stock en Mano: {totals.totalStockEnMano}</p>
            <p>Total Precio del Stock en Mano: {totals.totalPrecioStock}</p>
        </div>
    );
};

export default TotalesContainer;
