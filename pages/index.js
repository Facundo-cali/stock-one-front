import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { ProductProvider } from '../components/ProductContext';


export default function Home() {
  const [selectedOption, setSelectedOption] = useState('create'); // Estado inicial en 'create' para mostrar el formulario
  // ProductProvider es un componente que envuelve a todos los componentes que necesitan acceder al estado de los productos
  return (
    <ProductProvider>
      <div className="home-container">
        <div className="button-container">
          <button
            className="custom-button"
            onClick={() => setSelectedOption('create')}
          >
            Crear Producto
          </button>
          <button
            className="custom-button"
            onClick={() => setSelectedOption('view')}
          >
            Ver Productos
          </button>
        </div>

        {selectedOption === 'create' && <ProductForm />}
        {selectedOption === 'view' && <ProductList />}
      </div>
    </ProductProvider>
  );
}
