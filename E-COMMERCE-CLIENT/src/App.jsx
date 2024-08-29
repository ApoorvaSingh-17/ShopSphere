import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "./Pages/Success";
import { Navigate } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <Router>
     <Routes>

        <Route exact path="/" element={user?<Home />:<Login />} />  
        <Route path="/products/:category" element={user?<ProductList />:<Navigate to="/" />} />
        <Route path="/product/:id" element={user?<SingleProduct />:<Navigate to="/" />} />
        <Route path="/cart" element={user?<Cart />:<Navigate to="/" />} />
        <Route path="/success" element={<Success />} />
        <Route exact path="/login" element={user?<Home />:<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        
      
       </Routes>
    </Router> 
  );
};

export default App;