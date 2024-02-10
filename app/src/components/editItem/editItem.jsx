import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import productsService from "../../services/products.service";
import unitsService from "../../services/units.service";
import packagesService from "../../services/packages.service";
import bakeryService from "../../services/bakery.service";

import './edit.css';

function EditItem(props) {
    const [queryParameters] = useSearchParams();
    const initialState = {
        name: "",
        brand: "",
        price: .0,
        weight: "",
        units: 0,
        amount: 0,
        caducity_date: null,
        image: ""
    }
    const [item, setItem] = useState(initialState);
    const [productType, setProductType] = useState(0);
    const options = [
        {
          label: "Unidad"
        },
        {
          label: "Paquete"
        },
        {
          label: "Pan o postre"
        },
        {
          label: "Harina"
        },
    ];

    const getProduct = async (id) => {
        const product = await productsService.getProduct(id);
        const unit = await unitsService.getUnit(id);
        const pack = await packagesService.getPackage(id);
        product.price = unit.price;
        product.caducity_date = unit.caducity_date;
        if (pack != null) {
            product.units = pack.units;
            setProductType(1);
        }
        setItem(product);
    }

    const updateItem = async (e) => {
        e.preventDefault();
        await updateProduct(productType);
    }

    const updateProduct = async (type) => {
        const i = {
            name: item.name,
            brand: item.brand,
            weight: item.weight,
            amount: item.amount,
            image: item.image
        }
        const response = await productsService.updateProduct(item._id, i);
        if (response != null) {
            if (type === 0) {
                await updateUnit()
            }
            else if (type === 1) {
                await updatePackage();
            }
            else {
                await updateBakeryItem();
            }
        }
    }

    const updateUnit = async () => {
        const i = {
            price: item.price === '' ? 0 : parseFloat(item.price),
            caducity_date: item.caducity_date
        }
        const response = await unitsService.updateUnit(item._id, i);
        if (response != null) {
            alert(`Producto actualizado (${response.insertedId})`);
        }
        else {
            alert("Ocurrió un problema (unit)");
        }
    }

    const updatePackage = async (pack) => {
        const p = {
            units: item.units
        }
        const response = await productsService.updatePackage(item._id, p);
        if (response != null) {
            alert(`Producto actualizado (${response.insertedId})`);
            await updateUnit();
        }
        else {
            alert("Ocurrió un problema (pack)");
        }
    }

    const updateBakeryItem = async () => {
        const i = {
            name: item.name,
            brand: item.brand,
            price: parseFloat(item.price),
            weight: item.weight,
            amount: 0,
            image: item.image
        }
        const response = await bakeryService.addBakeryItem(item._id, i);
        if (response != null) {
            alert(`Producto actualizado (${response.insertedId})`);
        }
        else {
            alert("Ocurrió un problema (bakery)");
        }
    }

    const handleInputChange = (e) => {
        setItem({...item, [e.target.name]: e.target.value});
    }

    const handleSelectChange = (e) => {
        setProductType(parseInt(e.target.value));
    }

    useEffect(() => {
        getProduct(queryParameters.get('itemId'));
    }, []);

    return (
    <div id="add-form">
        <h1>Edición de productos</h1>

        <select name="item-type" id="item-type" value={productType} onChange={handleSelectChange}>
        {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
        ))}
        </select>

        <form onSubmit={updateItem}>
            <div className="form-control edit-name">
                <label htmlFor="name">Producto</label><br />
                <input type="text" value={item.name} name="name" onChange={handleInputChange} placeholder="Nombre del producto" />
            </div>
            <div className="form-control edit-brand">
                <label htmlFor="brand">Marca</label><br />
                <input type="text" value={item.brand} name="brand" onChange={handleInputChange} placeholder="Marca del producto" />
            </div>

            <div className="form-control pwa edit-price">
                <label htmlFor="price">Precio x unidad (S/)</label><br />
                <input type="number" value={item.price > 0 ? item.price : ''} name="price" className="price-input" onChange={handleInputChange} placeholder="0.00" />
            </div>

            <div className="form-control pwa edit-weight">
                <label htmlFor="weight">Peso x unidad</label><br />
                <input type="text" value={item.weight} name="weight" onChange={handleInputChange} placeholder="gr, Kg, ml, L" />
            </div>

            {
                productType === 1 ?
                <div className="form-control pwa edit-units">
                    <label htmlFor="units">Unidades x paquete</label><br />
                    <input type="number" value={item.units > 0 ? item.units : ''} name="units" onChange={handleInputChange} placeholder="#" />
                </div>
                :
                <></>
            }

            <div className="form-control edit-image">
                <label htmlFor="image">Imagen</label><br />
                <input type="url" value={(item.image !== undefined && item.image !== "") ? item.image : ""} name="image" onChange={handleInputChange} placeholder="Imagen del producto" />
            </div>

            <input type="submit" value="Guardar" />
        </form>
        <img src={(item.image !== undefined && item.image !== "") ? item.image : "http://cdn.onlinewebfonts.com/svg/img_546302.png"} alt="Imagen del producto" />
    </div>)
}

export default EditItem;