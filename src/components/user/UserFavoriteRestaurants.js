import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';

import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {getUser, USER_URL, UserNotFoundHTML, UserItemsList} from './UserUtil';

const layout = (rest) => {
  return (
    <Card style={{ 'margin-bottom': '20px' }}>
      <Card.Header as="h5">{rest.RestaurantName}</Card.Header>
    </Card>
  )
};

const UserFavoriteRestaurants = () => {
  const accountId = useParams().id;
  return UserItemsList(USER_URL + '/' + accountId + '/FavoriteRestaurants',
    'Restaurants',
    'Favorite Restaurants',
    layout);
}

export default UserFavoriteRestaurants