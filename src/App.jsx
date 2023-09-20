import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Product />} />
          <Route index path="/cart" element={<Cart />} />
          <Route index path="/detail/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
