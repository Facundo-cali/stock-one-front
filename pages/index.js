import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { useProduct } from '../components/ProductContext';



export default function Home() {
  const { fetchProducts, products } = useProduct(); // useProduct() es un hook personalizado que devuelve el contexto de los productos
  useEffect(() => {
    // Si no hay productos en el estado global, obtén los productos de la base de datos, de lo contrario evita que se haga una solicitud cada vez que se renderiza el componente.
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  const [selectedOption, setSelectedOption] = useState('view');
  return (
    <div className="home-container">
      <div className="button-container">
        <button
          className="custom-button"
          onClick={() => setSelectedOption('create')}
        >
          <p>Crear Producto(para pruebas)</p>
        </button>
        <button
          className="custom-button"
          onClick={() => setSelectedOption('view')}
        >
          Productos
        </button>
        <button
          className="custom-button"
          onClick={() => setSelectedOption('lowStock')}
        >
          Stock bajo
        </button>
        {/* <button
          className="custom-button"
          onClick={() => setSelectedOption('transactions')}
        >
          Transacciones
        </button> */}
      </div>

      {selectedOption === 'create' && <ProductForm />}
      {selectedOption === 'view' && <ProductList />}
      {/* {selectedOption === 'lowStock' && <LowStock />} */}
      {/* {selectedOption === 'transactions' && <Transactions />} */}

    </div>
    // Si la opción seleccionada es crear, muestra el formulario de creación de productos, de lo contrario muestra la lista de productos.
  );
}
