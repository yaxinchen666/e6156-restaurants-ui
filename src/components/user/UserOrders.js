import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';

import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {getUser, USER_URL, UserItemsList, UserNotFoundHTML} from './UserUtil';
import ReactPaginate from "react-paginate";

const layout = (order) => {
  return (
    <Card style={{ 'margin-bottom': '20px' }}>
      <Card.Header as="h5">{order.OrderID}</Card.Header>
    </Card>
  )
};

const UserOrders = () => {
  const accountId = useParams().id;
  return UserItemsList(USER_URL + '/' + accountId + '/UserOrders',
    'Orders',
    'Orders',
    layout);
}

export default UserOrders