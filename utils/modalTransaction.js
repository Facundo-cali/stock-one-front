import React from 'react';
import Modal from 'react-modal';
import { useProduct } from '../components/ProductContext';


function ModalTransaction({ product }) {

    const { isTransactionModalOpen, closeTransactionModal } = useProduct();


    return (
        <Modal
            isOpen={isTransactionModalOpen}
            onRequestClose={closeTransactionModal}
            className="custom-modal"
        >
            {product && (
                <div className="edit-form">
                    <h2>Transacción</h2>
                    <form>
                        <label>Fecha Actual:
                            <input type="text" name="date" value={new Date().toLocaleDateString()} />
                        </label>
                        <label>
                            <p> Nombre del Producto:{product.name}</p>
                        </label>
                        <label>Tipo de transacción:
                            <select name="type">
                                <option value="entrada">Entrada</option>
                                <option value="salida">Salida</option>
                            </select>
                        </label>
                        <label>
                            <p>Stock entró actual: {product.entro}</p>
                        </label>
                        <label>
                            Cantidad:
                            <input type="number" name="quantity" />
                        </label>
                        <label>
                            <p>En Mano: {product.enmano}</p>
                        </label>
                        <label>
                            Precio Unidad:
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={product.price}
                            />
                        </label>
                        <label>
                            Cantidad:
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                            />
                        </label>
                        <button>Guardar</button>
                    </form>
                </div>)}
        </Modal>
    );
}

export default ModalTransaction;