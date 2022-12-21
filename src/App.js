import './App.css';
import {Route, Routes} from 'react-router-dom';
import Restaurants from './components/Restaurants';
import Navigation from './components/Navigation';

import UserLogin from './components/user/UserLogin';
import UserHome from './components/user/UserHome';
import UserEdit from './components/user/UserEdit';
import UserOrders from './components/user/UserOrders';
import UserFavoriteRestaurants from "./components/user/UserFavoriteRestaurants";
import EditRestaurant from './components/EditRestaurant';
import Order from './components/Order';
import OrderInfo from "./components/OrderInfo";

function App() {
  return (
    <div className="App">
      <Navigation />
      <br />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/edit" element={<UserEdit />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/favorite-restaurants" element={<UserFavoriteRestaurants />} />
        <Route path="/restaurant/:id/edit" element={<EditRestaurant />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/order-info/:id" element={<OrderInfo />} />
      </Routes>
    </div>
  );
}

export default App;
