import './App.css';
import Header from './components/Header/Header';
import {Route, Routes} from "react-router-dom";
import Storefront from "./pages/Storefront/Storefront";
import Checkout from "./pages/Checkout/Checkout";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import ProductGallery from "./pages/ProductGallery/ProductGallery";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Storefront/>}/>
                <Route path="/product/" element={<ProductDetail/>}/>
                <Route path="/products/" element={<ProductGallery/>}/>
                <Route path="/cart" element={<ShoppingCart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
            </Routes>
        </div>
    );
}

export default App;
