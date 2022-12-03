import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {USER_URL, getUser, UserErrHTML, USER_STATUS} from './UserUtil';
import {ToastContainer} from "react-toastify";

const UserHome = () => {
  const [user, setUser] = useState({
    accountID: '',
    firstname: '',
    lastname: '',
    email: ''
  });
  const [accountId, setAccountId] = useState('');
  const [userStatus, setUserStatus] = useState(USER_STATUS.REQUEST_NOT_READY);

  useEffect(() => {
    getUser(setAccountId, setUser, setUserStatus).catch(
      err => {
        console.log(err);
        setUserStatus(USER_STATUS.NOT_FOUND_ERR);
      }
    ).then();
  },[]);

  const UserExistsHTML = () => {
    return (
      <div>
        <br/>
        <h1 className={'reg-font'}>{user.firstname} {user.lastname}</h1>
        <Link className='edit-link reg-font' to={`/user/edit`}> Edit Account </Link>
        <br/>
        <br/>
        <div className={'button-blocks'}>
          <div className={'button-block'}>
            <div className='button-block-link-div'>
              <Link className='reg-font button-block-link' to={`/user/favorite-restaurants`}> Favorites </Link>
            </div>
          </div>
          <div className={'button-block'}>
            <Link className='reg-font button-block-link' to={`/user/orders`}> Orders </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {userStatus === USER_STATUS.REQUEST_NOT_READY ?
        ''
        :
        <div>
          {userStatus === USER_STATUS.VALID ?
            <UserExistsHTML />
            : <UserErrHTML errMessage={userStatus} />}
        </div>}
      <ToastContainer />
    </div>
  );

}

export default UserHome