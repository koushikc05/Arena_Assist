import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';

// Import pages
import CheckIn from './pages/CheckIn';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderStatus from './pages/OrderStatus';
import Queue from './pages/Queue';
import Help from './pages/Help';
import VenueMap from './pages/VenueMap';

const App = () => {
  return (
    <SessionProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            {/* Application routing skeleton */}
            <Routes>
              <Route path="/" element={<CheckIn />} />
              <Route path="/home" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order/:orderId" element={<OrderStatus />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/help" element={<Help />} />
              <Route path="/map" element={<VenueMap />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </SessionProvider>
  );
};

export default App;
