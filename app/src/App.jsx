import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import MainNav from './components/mainNav/mainNav';
import ItemsList from './components/products/itemsList';
import PageNotFound from './components/pageNotFound/pageNotFound';

import AddItem from './components/addItem/addItem';
import EditItem from './components/editItem/editItem';
import AddPurchase from './components/addPurchase/addPurchase';
import Invoices from './components/invoices/invoices';

function App() {
  return (<>
    <Router>
      <MainNav />
      <div id='screen-content'>
        <Routes>
          {['/', '/units', '/packages', '/breads-and-desserts', '/flours']
            .map(path => <Route key={path} path={path} element={<ItemsList />} />)
          }
          <Route path='/add' element={<AddItem />} />
          <Route path='/edit' element={<EditItem />} />
          <Route path='/add-purchase' element={<AddPurchase />} />
          <Route path='/invoices' element={<Invoices />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  </>
    
  );
}

export default App;
