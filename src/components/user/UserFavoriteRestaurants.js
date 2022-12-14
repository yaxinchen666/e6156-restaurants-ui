import React from 'react';
import Card from 'react-bootstrap/Card';

import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {USER_URL, UserItemsList} from './UserUtil';

const layout = (rest) => {
  return (
    <Card style={{ 'margin-bottom': '20px' }}>
      <Card.Header as="h5">{rest.RestaurantName}</Card.Header>
    </Card>
  )
};

const UserFavoriteRestaurants = () => {
  const get_data_url = (accountId) => {
    return USER_URL + '/' + accountId + '/FavoriteRestaurants';
  }
  return UserItemsList(get_data_url,
    'Restaurants',
    'Favorite Restaurants',
    layout);
}

export default UserFavoriteRestaurants