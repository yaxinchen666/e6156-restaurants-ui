import React from 'react';
import Card from 'react-bootstrap/Card';

import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {USER_ORDERS_URL, UserItemsList} from './UserUtil';
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

const layout = (order) => {
  return (
    <Container>
      <Card style={{ 'margin-bottom': '20px' }}>
        <Card.Body>
          <Card.Text>
            {new Date(order.orderTime).toDateString()} | <Link to={`/order-info/${order.orderId}`}> Details </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
};

const UserOrders = () => {
  const get_data_url = (accountId) => {
    return USER_ORDERS_URL + '/' + accountId;
  }
  return UserItemsList(get_data_url,
    'data',
    'Orders',
    layout);
}

export default UserOrders