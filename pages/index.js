import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('create'); // Estado inicial en 'create' para mostrar el formulario

  return (
    <div className="home-container">
      {/* Botones para seleccionar la opción */}
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

      {/* Renderizar el componente correspondiente en función de la opción seleccionada */}
      {selectedOption === 'create' && <ProductForm />}
      {selectedOption === 'view' && <ProductList />}
    </div>
  );
}
