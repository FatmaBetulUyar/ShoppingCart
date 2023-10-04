import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./components/Header";
import Cart from "./components/Cart";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Product />} />
          <Route index path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
