import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {USER_URL, getUser, UserNotFoundHTML} from './UserUtil';
import {ToastContainer} from "react-toastify";

const UserHome = () => {
  const [user, setUser] = useState({
    accountID: '',
    firstname: '',
    lastname: '',
    email: ''
  });
  const accountId = useParams().id;
  const [userRequestReady, setUserRequestReady] = useState(false);
  const [userValid, setUserValid] = useState(true);

  useEffect(() => {
    getUser(accountId, setUser, setUserValid).catch(
      err => {
        console.log(err);
        setUserValid(false);
      }
    ).then(
      () => setUserRequestReady(true)
    );
  },[]);

  const UserExistsHTML = () => {
    return (
      <div>
        <br/>
        <h1 className={'reg-font'}>{user.firstname} {user.lastname}</h1>
        <Link className='edit-link reg-font' to={`/user/${user.accountID}/edit`}> Edit Account </Link>
        <br/>
        <br/>
        <div className={'button-blocks'}>
          <div className={'button-block'}>
            <div className='button-block-link-div'>
              <Link className='reg-font button-block-link' to={`/user/${user.accountID}/favorite-restaurants`}> Favorites </Link>
            </div>
          </div>
          <div className={'button-block'}>
            <Link className='reg-font button-block-link' to={`/user/${user.accountID}/orders`}> Orders </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {userRequestReady ? <div>{userValid ? <UserExistsHTML /> : <UserNotFoundHTML />}</div> : ''}
      <ToastContainer />
    </div>
  );

}

export default UserHome