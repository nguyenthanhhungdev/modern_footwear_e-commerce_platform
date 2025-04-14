import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './app/home/page';
import CartPage from './app/cart/page';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import SneakerPage from './app/sneaker/page';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/men/sneakers" element={<SneakerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
