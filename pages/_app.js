import '../styles/App.css';
import { ProductProvider } from '../components/ProductContext'; // Importa ProductProvider desde tu contexto

function MyApp({ Component, pageProps }) {
  return (
    <ProductProvider> {/* Envuelve tu aplicación con ProductProvider */}
      <Component {...pageProps} />
    </ProductProvider>
  );
}

export default MyApp;
