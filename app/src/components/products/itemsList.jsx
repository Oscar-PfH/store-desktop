import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from "../navbar/navbar";
import Item from './item';
import ItemModal from "./itemModal";

import { Icon } from 'react-icons-kit'
import { list } from 'react-icons-kit/icomoon';

import productsService from "../../services/products.service";
import unitsService from "../../services/units.service";
import packagesService from "../../services/packages.service";
import bakeryService from "../../services/bakery.service";

import './styles/items.css';

function ItemsList() {
    const [items, setItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const [location, setLocation] = useState(useLocation().pathname);

    const getProducts = async () => {
        const p = await productsService.getProducts();
        const u = await unitsService.getUnits();
        for (let i = 0; i < p.length; i++) {
            for (let j = 0; j < u.length; j++) {
                if (p[i]._id === u[j].prod_id) {
                    p[i].price = u[j].price;
                    break;
                }
            }
        }
        setItems(p);
    }

    const deleteProduct = async (id) => {
        confirmAlert({
            title: 'Alerta',
            message: '¿Seguro que quieres eliminar este producto?',
            buttons: [
                {
                label: 'Sí',
                onClick: async () => {
                    const response = (
                        location === '/'      ? await productsService.deleteProduct(id) :
                        location === '/units' ? await unitsService.deleteUnit(id) :
                        location === '/breads-and-desserts' || 
                        location === '/flours' ? await bakeryService.deleteBakeryItem(id) :
                                                await productsService.deleteProduct(id)
                        );
                    if (response != null) {
                        alert('Producto eliminado');
                        location === '/'      ? await getProducts() :
                        location === '/units' ? await getUnits() :
                        location === '/breads-and-desserts' ? await getBakeryItems(1) :
                        location === '/flours' ? await getBakeryItems(2) :
                                                await getProducts();
                    }
                    else 
                        alert('Ocurrió un problema, vuelva a intentarlo más tarde')
                }
                },
                {
                label: 'No',
                onClick: () => {}
                }
            ]
        });
    }

    const getUnits = async () => {
        const units = await unitsService.getUnitsNoPackages();
        const products = await productsService.getProducts();
        let p = []

        for (let i = 0; i < units.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (units[i].prod_id === products[j]._id) {
                    products[j].price = units[i].price;
                    p.push(products[j]);
                    break;
                }
            }
        }
        //setItems(p.map(i => i.toJSON()));
        setItems(p);
    }

    const getPackages = async () => {
        const products = await productsService.getProducts();
        const packages = await packagesService.getPackages();
        let p = [];

        for (let i = 0; i < packages.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (packages[i].prod_id === products[j]._id) {
                    products[j].units = packages[i].units;
                    p.push(products[j]);
                    break;
                }
            }
        }
        setItems(p);
    }

    const getBakeryItems = async (opt = 1) => {
        const b = await bakeryService.getBakeryItems();
        if (b != null) {
            if (opt === 1) {
                let bi = [];
                for (let i = 0; i < b.length; i++) {
                    if (b[i].brand === "" && b[i].brand != null)
                        bi.push(b[i]);
                }
                setItems(bi);
            }
            else {
                let bi = [];
                for (let i = 0; i < b.length; i++) {
                    if (b[i].brand !== "" && b[i].brand != null)
                        bi.push(b[i]);
                }
                setItems(bi);
            }
        }
        else {
            alert('No hay productos para mostrar');
        }
    }
    
    const openItemModal = (item_id) => {
        setCurrentId(item_id)
        setModalIsOpen(true);
    }

    const afterOpenModal = () => {
        console.log('running after ' + currentId);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    useEffect(() => {
        if (location === '/') {
            getProducts();
        }
        else if (location === '/units') {
            getUnits();
        }
        else if (location === '/packages') {
            getPackages();
        }
        else if (location === '/breads-and-desserts'){
            getBakeryItems(1);
        }
        else if (location === '/flours') {
            getBakeryItems(2);
        }
        else {
            getProducts();
        }
    }, [location]);

    return (<>
        <Navbar setLocation={setLocation} location={location} />
        <table>
            <thead>
                <tr>
                    <th><Icon icon={list} size={16} /></th>
                    <th>N°</th>
                    <th>ID</th>
                    <th>Descripción</th>
                    <th>Precio (S/)</th> 
                    <th>Unidades</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.length > 0 && items != null ? items.map((item, index) => (
                    <Item 
                        key={item._id}
                        item={item}
                        number={index + 1}
                        openItemModal={openItemModal}
                        deleteProduct={deleteProduct}
                    />
                )) : <tr><td>No Items</td></tr>}
            </tbody>
            <ItemModal 
                itemId={currentId}
                modalIsOpen={modalIsOpen}
                afterOpenModal={afterOpenModal}
                closeModal={closeModal}
                location={location}
            />
        </table>
    </>)
}

export default ItemsList;