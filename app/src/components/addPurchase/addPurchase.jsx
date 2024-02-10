import React, { useEffect, useState } from "react";

import productsService from "../../services/products.service";
import packagesService from "../../services/packages.service";
import unitsService from "../../services/units.service";
import bakeryService from "../../services/bakery.service";

import './addPurchase.css';

function AddPurchase() {
    const currentDate = new Date();
    const initialState = {
        prod_description: "",
        prod_id: "",
        purchase_price: .0,
        amount: 0,
        units: 0,
        caducity_date: '',
        type: 0,
        image: ''
    }
    const [item, setItem] = useState(initialState);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [bakeryItems, setBakeryItems] = useState([]);
    const [purchaseDate, setPurchaseDate] = useState(
        currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear()
    );
    const [selected, setSelected] = useState("");
    const temp_date = {
        dd: '',
        mm: '',
        yyyy: ''
    }
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    const getProducts = async () => {
        const p = await productsService.getProducts();
        const packs = await packagesService.getPackages();
        const b = await getBakeryItems();
        for (let i = 0; i < p.length; i++) {
            for (let j = 0; j < packs.length; j++) {
                if (p[i]._id === packs[j].prod_id) {
                    p[i].units = packs[j].units;
                    break;
                }
            }
        }
        for (let i = 0; i < b.length; i++) {
            if (b[i].brand !== "" && b[i].brand != null) {
                p.push(b[i]);
            }
        }
        setProducts(p);
    }

    const getBakeryItems = async () => {
        const b = await bakeryService.getBakeryItems();
        setBakeryItems(b);
        return b;
    }

    const addPurchase = async (e) => {
        e.preventDefault();
        if (items.length > 0) {
            items.map(async (item) => {
                const inv = {
                    prod_id: item.prod_id,
                    amount: item.amount,
                    purchase_price: item.purchase_price,
                    purchase_date: purchaseDate
                }
                const invoice = await productsService.addInvoice(inv);
                if (invoice != null && invoice.insertedId) {
                    for (let i = 0; i < products.length; i++) {
                        if (products[i].prod_id === item.prod_id)
                            item.amount = parseInt(item.amount) + parseInt(products[i].amount); break;
                    }
                    if (item.type === 0) {
                        const p = await productsService.updateProduct(item.prod_id, {amount: parseInt(item.amount)});
                        const u = await unitsService.updateUnit(item.prod_id, {caducity_date: item.caducity_date});
                        if (p != null && u != null) {
                            console.log('prod y unit actualizado');
                        }
                        else {
                            console.log('error 0');
                        }
                    }
                    else if (item.type === 1) {
                        const b = await bakeryService.updateBakeryItem(item.prod_id, {amount: parseInt(item.amount), caducity_date: item.caducity_date})
                        if (b != null) console.log('bakery actualizado');
                        else console.log('error 1');
                    }
                }
            });
            setItems([])
        }
        else {
            alert("No hay compras para agregar");
        }
        
    }

    const addItem = async () => {
        if (item.prod_id !== '' && item.amount !== 0 && item.purchase_price !== .0) {
            let i = {
                prod_id: item.prod_id,
                prod_description: item.prod_description,
                amount: item.amount,
                purchase_price: item.purchase_price,
                caducity_date: item.caducity_date,
                type: item.type
            }
            let is_in = false;
            for (let k = 0; k < items.length; k++) {
                if (i.prod_id === items[k].prod_id) {
                    is_in = true; break;
                }
            }
            if (is_in === false) {
                let _i = items;
                _i.push(i);
                setItems(_i);
                setItem(initialState);
                setSelected("");
            }
            else alert('El producto ya se encuentra en la lista!');    
        }
        else {
            if (item.prod_id === '') {
                alert("Seleccione un producto");
            }
            else if (item.amount === 0) {
                alert("Ingrese una cantidad");
            }
            else if (item.purchase_price === .0) {
                alert("Ingrese un precio");
            }
        }
    }
/*
    const addBakeryItem = async () => {
        const i = {
            name: item.name,
            brand: item.brand,
            price: parseFloat(item.price),
            bought_for: parseFloat(item.bought_for),
            weight: item.weight,
            amount: parseInt(item.amount),
            image: item.image
        }
        const response = await bakeryService.addBakeryItem(i);
        if (response.status === 200) {
            alert(response.data.message + ' (' + response.data.insertedId + ')');
            setItem(initialState);
        }
        else {
            alert(response.data.message);
        }
    }
*/
    const handleInputChange = (e) => {
        setItem({...item, [e.target.name]: e.target.value});
    }

    const handleDateChange = (e) => {
        let _name = e.target.name.split('-');
        switch (_name[1]) {
            case "day": temp_date.dd = e.target.value; break;
            case "month": temp_date.mm = e.target.value; break;
            case "year": temp_date.yyyy = e.target.value; break;
            default: temp_date.dd = currentDate.getDate(); temp_date.mm = currentDate.getMonth() + 1; temp_date.yyyy = currentDate.getFullYear(); break;
        }
        if (_name[0] === 'caducity') {
            let d = temp_date.dd + '-' + temp_date.mm + '-' + temp_date.yyyy;
            let i = item;
            i.caducity_date = d;
            setItem(i);
        }
        else {
            setPurchaseDate(temp_date.dd + '-' + temp_date.mm + '-' + temp_date.yyyy);
        }
    }

    const handleSelectChange = (e) => {
        setSelected(e.target.value);
        let prod = {};
        for (let i = 0; i < products.length; i++) {
            if (e.target.value === products[i]._id) {
                prod = products[i]
            }
        }
        setItem({
            ...item,
            "prod_id": prod._id,
            'prod_description': prod.name + ' ' + prod.brand + ' ' + prod.weight + (prod.units != null ? ' (x' + prod.units + ' u.)' : ''),
            "type": isBakeryItem(prod._id),
            "image": prod.image
        })
    }

    const isBakeryItem = (id) => {
        for (let i = 0; i < bakeryItems.length; i++) {
            if (bakeryItems[i]._id === id) {
                return 1;
            }
        }
        return 0;
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
    <div id="add-form">
        <h1>Compras del día</h1>

        <form id="add-product">
            <select name="products" id="products" value={selected} onChange={handleSelectChange}>
                <option>Seleccione un producto</option>
                {products.map((product) => (
                    <option key={product._id} value={product._id}>
                        {product.name + ' ' + product.brand + ' ' + product.weight + (product.units != null ? ' (x' + product.units + ' u.)' : '')}
                    </option>
                ))}
            </select>
            
            <div className="form-control edit-amount">
                <label htmlFor="amount">Cantidad</label><br />
                <input type="number" value={item.amount > 0 ? item.amount : ''} name="amount" onChange={handleInputChange} placeholder="#" />
            </div>
            <div className="form-control edit-price">
                <label htmlFor="bought-for">Comprado por (S/)</label><br />
                <input type="number" value={item.purchase_price > 0 ? item.purchase_price : ''} name="purchase_price" className="price-input" onChange={handleInputChange} placeholder="0.00" />
            </div>

            <div className="form-control edit-date">
                <label>Fecha de vencimiento (*)</label>
                <div className="date-input">
                    <input type="number" name="caducity-day" id="caducity-day" className="caducity-date" min="1" max="31" onChange={handleDateChange} placeholder="dd" />
                    /
                    <select name="caducity-month" id="months" onChange={handleDateChange}>
                        <option value={null}>Mes</option>
                        {
                            months.map((month, i) => (<option key={i} value={i + 1}>{month}</option>))
                        }
                    </select>
                    /
                    <input type="number" name="caducity-year" id="caducity-year" className="caducity-date" min="2000" max="3000" onChange={handleDateChange} placeholder="aaaa" />
                </div>
            </div>

            <input type="button" value="Agregar" onClick={addItem} />
        </form>

        <img src={(item.image !== undefined && item.image !== "") ? item.image : "http://cdn.onlinewebfonts.com/svg/img_546302.png"} alt="Imagen del producto" />



        <form id="products-list" onSubmit={addPurchase}>
            <h2>Lista de compras</h2>
            <div className="form-control edit-date">
                <label>Recibido el</label>
                <div className="date-input">
                    <input type="number" name="added-day" id="added-day" className="added-date" min="1" max="31" value={currentDate.getDate()} onChange={handleDateChange} placeholder="dd" />
                    /
                    <select name="months" id="months" defaultValue={10} onChange={handleDateChange}>
                        {
                            months.map((month, i) => (<option key={i} value={i + 1}>{month}</option>))
                        }
                    </select>
                    /
                    <input type="number" name="added-year" id="added-year" className="added-date" min="2000" max="3000" value={currentDate.getFullYear()} onChange={handleDateChange} placeholder="aaaa" />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Fecha de vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    items.length > 0 ?
                    items.map(i => (
                        <tr key={i.prod_id}>
                            <td>{i.prod_id.slice(-4)}</td>
                            <td>{i.prod_description}</td>
                            <td>{i.type === 0 ? 'Unidad' : 'Paquete'}</td>
                            <td>{i.amount}</td>
                            <td>{i.caducity_date}</td>
                        </tr>
                    ))
                    :
                    <></>
                    }
                </tbody>
            </table>
            <input type="submit" value="Guardar" />
        </form>
    </div>)
}

export default AddPurchase;