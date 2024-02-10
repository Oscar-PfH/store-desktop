import React from "react";
import { Link} from "react-router-dom";

import './navbar.css';

function Navbar(props) {

  const getLinkIndex = () => {
    switch (props.location) {
      case '/': return 0;
      case '/units': return 1;
      case '/packages': return 2;
      case '/breads-and-desserts': return 3;
      case '/flours': return 4;
      default : return 1;
    }
  }

  window.onload = () => {
    const links = document.getElementsByClassName('link');
    const li = getLinkIndex();
    Array.from(links).forEach((link, index) => {
      if (index === li) {
        link.classList.add('selected');
      }
      link.onclick = () => {
        Array.from(links).forEach(l => {
          l.classList.remove('selected');
        });
        link.classList.add('selected');
      }
    });
  };

  return (<>
      <header>
        <nav>
          <ul>
            <li><Link to="/" className="link" onClick={() => props.setLocation('/')}>Productos</Link></li>
            <li><Link to="/units" className="link" onClick={() => props.setLocation('/units')}>Unidades</Link></li>
            <li><Link to="/packages" className="link" onClick={() => props.setLocation('/packages')}>Paquetes</Link></li>
            <li><Link to="/breads-and-desserts" className="link" onClick={() => props.setLocation('/breads-and-desserts')}>Panes y postres</Link></li>
            <li><Link to="/flours" className="link" onClick={() => props.setLocation('/flours')}>Harinas</Link></li>
          </ul>
        </nav>
      </header>
  </>)
}

export default Navbar;