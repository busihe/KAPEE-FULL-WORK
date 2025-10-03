import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Shop from './pages/Shopping';
import Deals from './pages/Deals';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import Login from './pages/Login';

import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import AdminLayout from './pages/admin/AdminLayout';
import Orders from './pages/admin/orders';
import Checkout from './pages/payment';

import { AuthProvider } from './context/AuthProvider';
import Subscribe from './pages/admin/subscribe';
import BlogPage from './components/blog';
import PasswordReset from "./pages/passwordRest";
import Selling from './pages/selling';


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="deals" element={<Deals />} />
            <Route path="account" element={<Account />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="payment" element={<Checkout />} />
            <Route path="blog" element={<BlogPage />} />
           <Route path='/passwordRest' element={<PasswordReset />} />
            <Route path='/selling' element={<Selling />} />
          </Route>

          {/* Admin Pages with Sidebar */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="subscribe" element={<Subscribe />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
