import './App.css';
import {Route, Routes} from 'react-router-dom';
import Restaurants from './components/Restaurants';
import Navigation from './components/Navigation';

import UserRegister from './components/user/UserRegiter';
import UserLogin from './components/user/UserLogin';
import UserHome from './components/user/UserHome';
import UserEdit from './components/user/UserEdit';
import UserOrders from './components/user/UserOrders';
import UserFavoriteRestaurants from "./components/user/UserFavoriteRestaurants";
import EditRestaurant from './components/EditRestaurant';

function App() {
  return (
    <div className="App">
      <Navigation />
      <br />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/:id/home" element={<UserHome />} />
        <Route path="/user/:id/edit" element={<UserEdit />} />
        <Route path="/user/:id/orders" element={<UserOrders />} />
        <Route path="/user/:id/favorite-restaurants" element={<UserFavoriteRestaurants />} />
        <Route path="/restaurant/:id/edit" element={<EditRestaurant />} />
      </Routes>
    </div>
  );
}

export default App;
