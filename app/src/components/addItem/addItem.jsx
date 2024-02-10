import React, { useState } from "react";

import productsService from "../../services/products.service";
import unitsService from "../../services/units.service";
import packagesService from "../../services/packages.service";
import bakeryService from "../../services/bakery.service";

import './addItem.css';

function AddItem() {
    const initialState = {
        name: "",
        brand: "",
        price: .0,
        weight: "",
        units: 0,
        amount: 0,
        prod_date: '',
        caducity_date: '',
        image: ""
    }
    const [item, setItem] = useState(initialState);
    const [productType, setProductType] = useState(0);
    const options = [
        {
          label: "Unidad",
          value: 0,
        },
        {
          label: "Paquete",
          value: 1,
        },
        {
          label: "Pan o postre",
          value: 2,
        },
        {
          label: "Harina",
          value: 3,
        },
      ];

    const addItem = async (e) => {
        e.preventDefault();
        await addProduct(productType);
        /*switch (productType) {
            case 0: await addUnit(); break;
            case 1: await addPackage(); break;
            case 2: await addProduct(); break;
            case 3: await addBakeryItem(); break;
            default: await addUnit(); break;
        }*/
    }

    const addProduct = async (type) => {
        const i = {
            name: item.name,
            brand: item.brand,
            weight: item.weight,
            amount: 0,
            image: item.image
        }
        if (type === 2 || type === 3)
            await addBakeryItem();
        else {
            const response = await productsService.addProduct(i);
            if (response != null) {
                if (type === 0) {
                    await addUnit({
                        package_id: '',
                        prod_id: response.insertedId
                    })
                }
                else if (type === 1) {
                    await addPackage({
                        prod_id: response.insertedId
                    });
                }
                else {
                    await addBakeryItem();
                }
            }
            else {
                alert("Ha ocurrido un error, vuelva a intentarlo");
            }
        }
        setItem(initialState);
    }

    const addUnit = async (pack) => {
        const i = {
            package_id: pack.package_id,
            prod_id: pack.prod_id,
            price: item.price === '' ? 0 : parseFloat(item.price),
            caducity_date: item.caducity_date
        }
        const response = await unitsService.addUnit(i);
        if (response !== null && response.insertedId) {
            alert(`Producto agregado exitosamente (${response.insertedId})`);
            setItem(initialState);
        }
        else {
            alert("Ha ocurrido un error. Vuelva a intentarlo");
        }
    }

    const addPackage = async (pack) => {
        const p = {
            prod_id: pack.prod_id,
            units: item.units
        }
        const response = await packagesService.addPackage(p);
        if (response != null && response.insertedId) {
            await addUnit({
                package_id: response.insertedId,
                prod_id: pack.prod_id
            });
        }
        else {
            alert("Ha ocurrido un error. Vuelva a intentarlo");
        }
    }

    const addBakeryItem = async () => {
        const i = {
            name: item.name,
            brand: item.brand,
            price: parseFloat(item.price),
            weight: item.weight,
            amount: 0,
            prod_date: '',
            image: item.image
        }
        const response = await bakeryService.addBakeryItem(i);
        if (response != null && response.insertedId) {
            alert(`Producto agregado exitosamente. (${response.insertedId})`);
            setItem(initialState);
        }
        else {
            alert("Ha ocurrido un error. Vuelva a intentarlo");
        }
    }

    const handleInputChange = (e) => {
        setItem({...item, [e.target.name]: e.target.value});
    }

    const handleSelectChange = (e) => {
        setProductType(parseInt(e.target.value));
    }

    return (
    <div id="add-form">
        <h1>Agrega un nuevo producto</h1>

        <select name="item-type" id="item-type" value={productType} onChange={handleSelectChange}>
        {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        </select>

        <form onSubmit={addItem}>
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

export default AddItem;