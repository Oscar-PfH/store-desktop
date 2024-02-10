import React from "react";
import { Link } from "react-router-dom";

import './mainNav.css';

function MainNav() {
    return (<div id="main-nav">
        <a href="/" id="logo">
            <img src="https://img.freepik.com/vector-gratis/diseno-panaderia_24908-54600.jpg" alt="Logo" />
        </a>
        <Link to={'/add'}><button className="add-btn">Nuevo (+)</button></Link>
        <Link to={'/add-purchase'}><button className="add-btn">Agregar compras</button></Link>
        <Link to={'/flours'}><button className="add-btn">Harinas</button></Link>
        <Link to={'/invoices'}><button className="add-btn">Facturas</button></Link>
    </div>);
}

export default MainNav;