import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';

import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {getUser, USER_URL, UserItemsList} from './UserUtil';
import Cookies from "universal-cookie";

const layout = (rest) => {
  return (
    <Card style={{ 'margin-bottom': '20px' }}>
      <Card.Header as="h5">{rest.RestaurantName}</Card.Header>
    </Card>
  )
};

const UserFavoriteRestaurants = () => {
  return UserItemsList('FavoriteRestaurants',
    'Restaurants',
    'Favorite Restaurants',
    layout);
}

export default UserFavoriteRestaurants