import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import { Icon } from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import { u1F539 } from 'react-icons-kit/noto_emoji_regular'
import { edit } from "react-icons-kit/fa";

import productsService from "../../services/products.service";
import unitsService from "../../services/units.service";
import packagesService from "../../services/packages.service";
import bakeryService from "../../services/bakery.service";

import './styles/itemModal.css'

Modal.setAppElement('#root');

function ItemModal(props) {
    const initialState = {
        _id: "",
        name: "",
        brand: "",
        price: .0,
        weight: "",
        amount: 0,
        units: 0,
        prod_date: null,
        caducity_date: null,
        image: "",
    };
    const [item, setItem] = useState(initialState);

    const getProduct = async (id) => {
        const product = await productsService.getProduct(id);
        const pack = await packagesService.getPackage(id);
        const unit = await unitsService.getUnit(id);
        product.price = unit.price;
        product.caducity_date = unit.caducity_date;
        if (pack != null) {
            product.units = pack.units;
        }
        setItem(product);
    }

    const getBakeryItem = async (id) => {
        const bitem = await bakeryService.getBakeryItem(id);
        setItem(bitem);
    }

    const closeModal = () => {
        setItem(initialState);
        props.closeModal();
    }

    useEffect(() => {
        if (props.modalIsOpen) {
            if (props.location === '/' || props.location === '/units' || props.location === '/packages')
                getProduct(props.itemId);
            else if (props.location === '/flours' || props.location === '/breads-and-desserts')
                getBakeryItem(props.itemId);
            else 
                getProduct(props.itemId);
        }
    }, [props]);

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
            position: 'absolute',
            top: '100px',
            left: '250px',
            right: '250px',
            bottom: '100px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '10px'
        }
    }

    return (<Modal
        isOpen={props.modalIsOpen}
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
    >
        <header className="modal-header">
            <h2>Detalles del producto (#{props.itemId})</h2>
            <Icon icon={close} size={32} className="close" onClick={closeModal} title="Cerrar" />
        </header>
        
        <div className="modal-body">
            <div className="product-prop">
                <Icon icon={u1F539} size={16} className="item-icon" />
                <h3>Producto</h3>
                <p>{item.name}</p>
            </div>
            <div className="product-prop">
                <Icon icon={u1F539} size={16} className="item-icon" />
                <h3>Marca</h3>
                <p>{item.brand}</p>
            </div>
            <div className="product-prop">
                <Icon icon={u1F539} size={16} className="item-icon" />
                <h3>Precio</h3>
                <p>{item.price !== null ? 'S/' + item.price.toFixed(2) : 's.p.' || 'S/0.00'}</p>
            </div>
            <div className="product-prop">
                <Icon icon={u1F539} size={16} className="item-icon" />
                <h3>Peso</h3>
                <p>{item.weight}</p>
            </div>
            <div className="product-prop">
                <Icon icon={u1F539} size={16} className="item-icon" />
                <h3>Cantidad</h3>
                <p>{item.amount}</p>
            </div>
            {
                item.units > 0 ? 
                <div className="product-prop">
                    <Icon icon={u1F539} size={16} className="item-icon" />
                    <h3>Unidades x paquete</h3>
                    <p>{item.units}</p>
                </div>
                :
                <></>
            }
            {
                props.location === '/breads-and-desserts' ? 
                <div className="product-prop">
                    <Icon icon={u1F539} size={16} className="item-icon" />
                    <h3>Fecha de producción</h3>
                    <p>{item.prod_date != null && item.prod_date !== "" ? item.caducity_date : "no asignado"}</p>
                </div>
                :
                <></>
            }
            
            <div className="product-prop">
                <Icon icon={u1F539} size={16} className="item-icon" />
                <h3>Fecha de vencimiento</h3>
                <p>{item.caducity_date != null && item.caducity_date !== "" ? item.caducity_date : "no asignado"}</p>
            </div>
        </div>
        <aside className="modal-image">
            <img src={item.image !== undefined && item.image !== '' ? item.image : 'https://cdn.onlinewebfonts.com/svg/img_546302.png'} alt="Imagen del producto" />
        </aside>
        <footer className="modal-footer">
            <Link to={`/edit?itemId=${item._id}`} className="edit-btn"><Icon icon={edit} size={20} /> Editar</Link>
        </footer>
    </Modal>);
}

export default ItemModal;