import '../styles/App.css';
import { ProductProvider } from '../components/ProductContext'; // Importa ProductProvider desde tu contexto
import { AuthProvider } from '../components/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProductProvider> {/* Envuelve tu aplicación con ProductProvider */}
        <Component {...pageProps} />
      </ProductProvider>
    </AuthProvider>
  );
}

export default MyApp;
