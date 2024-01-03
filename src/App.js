import {Routes,Route,BrowserRouter as Router} from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/userInterface/components/screens/Home";
import ProductFilterScreen from "./Components/userInterface/components/screens/ProductFilterScreen";
import ProductPurchaseScreen from "./Components/userInterface/components/screens/ProductPurchaseScreen";
import Cart from "./Components/userInterface/components/screens/Cart";
import CreateAccountPage from "./Components/userInterface/components/CreateAccountPage";
import Shipping from "./Components/userInterface/components/Shipping";
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/dashboard/*" element={<Dashboard />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/productfilter" element={<ProductFilterScreen />}></Route>
          <Route path="/productpurchase" element={<ProductPurchaseScreen />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/createAccount" element={<CreateAccountPage />}></Route>
          <Route path="/shipping" element={<Shipping />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;