import React from 'react';
import Card from 'react-bootstrap/Card';

import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {getUser, USER_URL, UserItemsList, UserNotFoundHTML} from './UserUtil';
import Cookies from "universal-cookie";

const layout = (order) => {
  return (
    <Card style={{ 'margin-bottom': '20px' }}>
      <Card.Header as="h5">{order.OrderID}</Card.Header>
    </Card>
  )
};

const UserOrders = () => {
  return UserItemsList('UserOrders',
    'Orders',
    'Orders',
    layout);
}

export default UserOrders