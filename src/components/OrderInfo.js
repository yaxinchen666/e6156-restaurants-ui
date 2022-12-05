import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from "react-toastify";
import {USER_STATUS, UserErrHTML} from "./user/UserUtil";
import Cookies from "universal-cookie";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/Container";

const OrderInfo = () => {
  const [order, setOrder] = useState({
    time: '',
    total: '',
    restaurant: '',
    dishes: [],
    firstname: '',
    lastname: '',
  });
  const [userStatus, setUserStatus] = useState(USER_STATUS.REQUEST_NOT_READY);

  const cookies = new Cookies();

  const orderId = useParams().id;

  useEffect(() => {
    if (cookies.get('id') === undefined) {
      setUserStatus(USER_STATUS.NOT_LOGIN_ERR);
    } else {
      // TODO send request to composite service
      setUserStatus(USER_STATUS.VALID)
      setOrder({
        time: '15:00 12-07-2022',
        total: '25',
        restaurant: 'res',
        dishes: [
          'dish1',
          'dish2'
        ],
        firstname: 'first',
        lastname: 'last',
      })
    }
  },[]);

  const OrderInfoHTML = () => {
    return (
      <Container>
        <h1>{order.restaurant}</h1>
        <p><b>Ordered at:</b> {order.time} </p>
        <h5> {order.firstname + ' ' + order.lastname}'s order </h5>
        <ListGroup width={'60%'}>
          {order.dishes.map(dish =>
            <ListGroup.Item>{dish}</ListGroup.Item>
          )}
        </ListGroup>
        <br/>
        <p><b>Total:</b> ${order.total}</p>
      </Container>
    )
  }

  return (
    <div>
      {userStatus === USER_STATUS.REQUEST_NOT_READY ?
        ''
        :
        <div>
          {userStatus === USER_STATUS.VALID ?
            <OrderInfoHTML />
            : <UserErrHTML errMessage={userStatus} />}
        </div>}
      <ToastContainer />
    </div>
  );

}

export default OrderInfo