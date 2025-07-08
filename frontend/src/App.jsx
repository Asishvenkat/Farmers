// import { use } from 'react';
import './App.css'
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
// import Product from './Pages/Product';
//import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import Wishlist from './Pages/wishlist';
import Orders from './Pages/order';
import ScrollToTop from "./components/Scroll";
import AddProduct from './Pages/farmers/add';
import ViewProducts from './Pages/farmers/products';
import UpdateProduct from './Pages/farmers/update';
import Products from './Pages/reatilers/Products';
import Product from './Pages/reatilers/product'

import {
  BrowserRouter as Router,
   Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector((state) => state.user.currentUser);
  return   (
       <Router>
         <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/farmer/products" element={<ViewProducts />} /> 
        <Route path="/farmer/add-product" element={<AddProduct />} />
       <Route path="/orders" element={<Orders />} />
       <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}


export default App
