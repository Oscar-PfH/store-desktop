import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Icon } from 'react-icons-kit'
import { list } from 'react-icons-kit/icomoon';
import { ic_delete } from 'react-icons-kit/md'

import productsService from "../../services/products.service";
import unitsService from "../../services/units.service";
import packagesService from "../../services/packages.service";
import bakeryService from "../../services/bakery.service";

import './invoices.css';

function Invoices() {
    const [dates, setDates] = useState([]);
    const [items, setItems] = useState([]);
    const [currentInvoiceDate, setCurrentInvoiceDate] = useState('');

    const getInvoices = async () => {
        const invoices = await productsService.getInvoices();
        let d = [invoices[0].purchase_date];
        for (let i = 1; i < invoices.length; i++) {
            let is_dif = false;
            for (let j = 0; j < d.length; j++) {
                if (invoices[i].purchase_date !== d[j]) {
                    is_dif = true;
                }
                else is_dif = false;
            }
            if (is_dif) {
                d.push(invoices[i].purchase_date);
            }
        }
        setDates(d);
    }

    const getProducts = async (inv_date) => {
        const inv = await productsService.getInvoicesByDate(inv_date);
        let _items = [];
        for (let k = 0; k < inv.length; k++) {
            const pro = await productsService.getProduct(inv[k].prod_id);
            const pck = await packagesService.getPackage(inv[k].prod_id)
            const u = await unitsService.getUnit(inv[k].prod_id);
            const b = await bakeryService.getBakeryItem(inv[k].prod_id);
            if (pro != null) {
                pro.purchase_price = inv[k].purchase_price;
                pro.amount = inv[k].amount;
                if (u != null)
                    pro.price = u.price;
                if (pck != null)
                    pro.units = pck.units;
                _items.push(pro);
            }
            else if (b != null)
                _items.push(b);
        }
        setItems(_items);
        setCurrentInvoiceDate(inv_date);
    }

    const deleteInvoice = async (id) => {
        confirmAlert({
            title: 'Alerta',
            message: '¿Seguro que quieres eliminar este producto de la factura?',
            buttons: [
                {
                label: 'Sí',
                onClick: async () => {
                    const response = await productsService.deleteInvoice(id);
                    if (response != null)
                        alert("Producto eliminado de la factura");
                    else alert("Ocurrió un problema");
                }
                },
                {
                label: 'No',
                onClick: () => {}
                }
            ]
        });
    }

    const deleteInvoices = async (inv_date) => {
        confirmAlert({
            title: 'Alerta',
            message: '¿Seguro que quieres eliminar esta factura?',
            buttons: [
                {
                label: 'Sí',
                onClick: async () => {
                    const r = await productsService.deleteInvoicesByDate(inv_date);
                    if (r != null) {
                        alert('Factura eliminada');
                        setItems([]);
                        setCurrentInvoiceDate('');
                    }
                    else alert('Ocurrió un problema. Vuelva a intentarlo');
                }
                },
                {
                label: 'No',
                onClick: () => {}
                }
            ]
        });
    }
    
    useEffect(() => {
        getInvoices();
    }, []);

    return (<>
        <table id="dates">
            <thead>
                <tr>
                    <th>Fechas</th>
                </tr>
            </thead>
            <tbody>
                {
                    dates.map((d, i) => (
                        <tr key={i+1} onClick={() => getProducts(d)}>
                            <td>{d}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <table id="items">
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
                    <tr key={index}>
                        <td><input type="checkbox" onClick={e => e.stopPropagation()} /></td>
                        <td>{index + 1}</td>
                        <td>{item._id.slice(-4)}</td>
                        <td>{item.name + ' ' + item.brand + ' ' + item.weight + `${item.units != null ? '(' + item.units + ')' : ''}`}</td>
                        <td>{item.purchase_price}</td>
                        <td>{item.amount}</td>
                        <td><Icon icon={ic_delete} size={20} onClick={deleteInvoice} title="Eliminar" /></td>
                    </tr>
                )) : <tr><td>No Items</td></tr>}
            </tbody>
        </table>
        <button onClick={() => deleteInvoices(currentInvoiceDate)}>Eliminar Factura</button>
    </>)
}

export default Invoices;