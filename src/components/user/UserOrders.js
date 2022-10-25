import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {getUser, USER_URL, UserNotFoundHTML} from './UserUtil';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const accountId = useParams().id;
  const [requestReady, setRequestReady] = useState(false);
  const [userValid, setUserValid] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      if (accountId) {
        try {
          // TODO should sent to Orders db?
          const response = await axios.get( USER_URL + '/' + accountId + '/UserOrders');
          console.log(response);
          if (response.status === 200) {
            console.log(response);
            // TODO...
            setUserValid(true);
          }
        }
        catch (err) {
          // TODO...
          /*
          if (err.response.data === "USER NOT FOUND") {
            setUserValid(false);
          } else if (err.response.data === "NOT FOUND") {
            setOrders([]);
          }
           */
          console.log(err.response.data);
        }
      }
    }
    getOrders().then(
      () => setRequestReady(true)
    );
  },[]);

  const UserExistsHTML = () => {
    return (
      <div>
        <Link className='cancel-link reg-font' to={`/user/${accountId}/home`}> <p>&larr;  Back to home page </p> </Link>
        <br />
        <br />

        <h1 className={'reg-font'}> Orders </h1>
      </div>
    )
  }

  return (
    <div>
      {requestReady ? <div> {userValid ? <UserExistsHTML /> : <UserNotFoundHTML />}</div> : ''}
    </div>
  );
}

export default UserOrder