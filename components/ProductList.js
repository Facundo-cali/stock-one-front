import { useProduct } from './ProductContext';
import LoadingSpinner from '../utils/LoadingSpinner';
import TotalesContainer from '../utils/calcularTotales';
import ProductDetail from '@/utils/productDetail';



function ViewProducts() {
    const { products, isLoading, isDetailsModalOpen, openDetailsModal, selectedProduct } = useProduct();

    return (
        <>
            <div className={`product-container ${isLoading ? 'hide-scroll-bar' : ''}`}>
                <div>
                    <TotalesContainer products={products} /> {/* Renderiza el componente TotalesContainer y pasa la lista de productos */}
                </div>

                {/* Si isLoading es true, muestra el componente LoadingSpinner, de lo contrario muestra la lista de productos */}
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="products">
                        {products.map((product) => (
                            <div className="product" key={product._id}>
                                <div className="product-info">
                                    <span className="product-name">{product.name} ({product.code}):</span>
                                    <span>Entró: {product.entro}</span>
                                    <span>Salió: {product.salio}</span>
                                    <span>En Mano: {product.enmano}</span>
                                </div>
                                <div className="actions">
                                    <button className="edit-button" onClick={() => openDetailsModal(product)}>
                                        Detalles
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Renderiza el componente ProductDetail */}
                        <ProductDetail product={selectedProduct} isOpen={isDetailsModalOpen} />
                    </div>
                )}
            </div>
        </>
    );
}

export default ViewProducts;