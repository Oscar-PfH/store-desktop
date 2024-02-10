import React from "react";
//import { useLocation } from "react-router-dom";

import { Icon } from 'react-icons-kit';
import { ic_delete } from 'react-icons-kit/md'

import './styles/item.css';

function Item(props) {

    const deleteProduct = (e) => {
        e.stopPropagation();
        props.deleteProduct(props.item._id);
    }

    return (<>
        <tr onClick={() => props.openItemModal(props.item._id)}>
            <td><input type="checkbox" onClick={e => e.stopPropagation()} /></td>
            <td>{props.number}</td>
            <td>{props.item._id.slice(-4)}</td>
            <td>{props.item.name + ' ' + props.item.brand + (props.item.weight !== "" ? ' (' + props.item.weight + ')' : "")}</td>
            <td>{(props.item.price !== "" && props.item.price !== undefined) ? props.item.price.toFixed(2) : 's.p.' || '0.00'}</td>
            <td>{props.item.amount || 0}</td>
            <td><Icon icon={ic_delete} size={20} onClick={deleteProduct} title="Eliminar" /></td>
        </tr>
    </>);
}

export default Item;