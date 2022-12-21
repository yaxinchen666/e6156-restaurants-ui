import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from "react-toastify";
import Cookies from "universal-cookie";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/Container";

const OrderInfo = () => {
  const STATUS = {
    VALID: "Valid",
    REQUEST_NOT_READY: "Request Not Ready",
    AUTH_FAILED_ERR: "Authentication Failed",
    OTHER: "Other"
  }

  const [order, setOrder] = useState({
    time: '',
    total: '',
    restaurant: '',
    dishes: {},
    firstname: '',
    lastname: '',
  });
  const [status, setStatus] = useState(STATUS.REQUEST_NOT_READY);

  const cookies = new Cookies();

  const orderId = useParams().id;

  useEffect(() => {
    if (cookies.get('id') === undefined) {
      setStatus(STATUS.AUTH_FAILED_ERR);
    } else {
      axios.get('https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/order/' + orderId, {
        headers: {
          'Authorization': cookies.get('token')
        }
      }).then(response => {
        setStatus(STATUS.VALID)
        setOrder({
          time: new Date(response.data.data.orderTime).toDateString(),
          total: response.data.data.total,
          restaurant: response.data.data.restaurant.restName,
          dishes: response.data.data.dishList.map(dish_info => dish_info.dishName)
            .reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {}),
          firstname: response.data.data.user.firstName,
          lastname: response.data.data.user.lastName,
        })
      }).catch(err => {
        setStatus(STATUS.OTHER)
        console.log(err)
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
          {Object.keys(order.dishes).map(dish =>
            <ListGroup.Item> <em>{dish}</em>  <span>&nbsp;&#215;</span> {order.dishes[dish]}</ListGroup.Item>
          )}
        </ListGroup>
        <br/>
        {/*<p><b>Total:</b> ${order.total}</p>*/}
      </Container>
    )
  }

  const InvalidAccessHTML = () => {
    return (
      <div>
        <h3 className={"sign-in-font"}> Invalid access. You may need to log in to continue. <Link className='sign-in-link' to="/user/login"> Log in </Link> </h3>
      </div>
    );
  }

  // const ServerErrorHTML = () => {
  //   return (
  //     <div>
  //       <h3 className={"sign-in-font"}> Internal Server Error. </h3>
  //     </div>
  //   );
  // }

  return (
    <div>
      {status === STATUS.REQUEST_NOT_READY ?
        'Still loading...'
        :
        <div>
          {status === STATUS.VALID ?
            <OrderInfoHTML />
            :
            <InvalidAccessHTML />
          }
        </div>}
      <ToastContainer />
    </div>
  );

}

export default OrderInfo