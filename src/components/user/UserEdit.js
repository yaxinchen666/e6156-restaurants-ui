import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {GoogleLogout} from "react-google-login";

import './User.css'

import {getUser, USER_URL, USER_STATUS, UserErrHTML, LOGIN_URL, GOOGLE_CLIENT_ID} from './UserUtil';
import Cookies from "universal-cookie";

const UserEdit = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: ''
  });
  const [accountId, setAccountId] = useState('');
  const [userStatus, setUserStatus] = useState(USER_STATUS.REQUEST_NOT_READY);

  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    getUser(setAccountId, setUser, setUserStatus).catch(
      err => {
        console.log(err);
        setUserStatus(USER_STATUS.NOT_FOUND_ERR);
      }
    ).then();
  },[]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(user_params => ({...user_params, [name]: value}));
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const NAME_REGEX = /^[A-z]{1,24}$/;
    if (!NAME_REGEX.test(user.firstname) || !NAME_REGEX.test(user.lastname)) {
      toast.error("Invalid name. Name should contain only characters and be of length 1 - 24");
      return;
    }

    let formData = new FormData();
    formData.append('FirstName', user.firstname);
    formData.append('LastName', user.lastname);
    try {
      const response = await axios.put(USER_URL + '/' + accountId, formData,  {
        headers: {
          'Authorization': cookies.get('token')
        }
      });
      if (response.status === 200) {
        toast.success("Update success.", {autoClose: 1000, hideProgressBar: true});
        setTimeout(() => {
          return navigate('/user/home');
        }, 1000);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (err) {
      if (err.response.status === 440) {
        setUserStatus(USER_STATUS.SESSION_EXPIRED_ERR);
      } else if (err.response.status === 401) {
        setUserStatus(USER_STATUS.AUTH_FAILED_ERR);
      }
      toast.error("Failed to update user.");
      console.log(err);
    }
  }

  const handleLogoutSubmit = async () => {
    const cookies = new Cookies();
    cookies.remove('id');
    cookies.remove('token');
    return navigate('/user/login');
  }

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(USER_URL + '/' + accountId,  {
        headers: {
          'Authorization': cookies.get('token')
        }
      });
      if (response.status === 200) {
        const cookies = new Cookies();
        cookies.remove('id');
        cookies.remove('token');

        toast.success("Deletion success.");
        setTimeout(() => {
          return navigate('/user/login');
        }, 1000);
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (err) {
      if (err.response.status === 440) {
        setUserStatus(USER_STATUS.SESSION_EXPIRED_ERR);
      } else if (err.response.status === 401) {
        setUserStatus(USER_STATUS.AUTH_FAILED_ERR);
      }
      toast.error("Failed to delete user.");
      console.log(err);
    }
  }

  return (
    <div>
      {userStatus === USER_STATUS.REQUEST_NOT_READY ?
        ''
        :
        <div>
          {userStatus === USER_STATUS.VALID ?
            <div>
              <Link className='cancel-link reg-font' to={`/user/home`}> <p>&larr;  Back to home page </p> </Link>
              <br />

              <br />
              <br />

              <div>
                <GoogleLogout
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={handleLogoutSubmit}
                ></GoogleLogout>
              </div>

              <br />
              <br />
              <div className={'grey-line'}></div>
              <br />
              <br />

              <form onSubmit={handleEditSubmit} method="post" className = "log-form">
                <label className="log-label">
                  First Name
                </label>
                <input className="log-input"  type="text" id = "firstname" name = "firstname" required value={user.firstname} onChange={handleChange} />
                <br />

                <label className="log-label">
                  Last Name
                </label>
                <input className="log-input"  type="text" id = "lastname" name = "lastname" required value={user.lastname} onChange={handleChange} />

                <br />
                <br />

                <div className="container-log-btn">
                  <button type="submit" name = "btn_submit" className="log-form-btn">
                    <span> Edit </span>
                  </button>
                </div>
                <br />
              </form>

              <br />
              <br />
              <br />
              <div className={'grey-line'}></div>
              <br />
              <br />

              <form onSubmit={handleDeleteSubmit} method="post">
                <div className="container-log-btn">
                  <button type="submit" name = "btn_submit" className="log-form-btn">
                    <span> Delete account </span>
                  </button>
                </div>
              </form>

              <br />
              <br />

            </div>
            : <UserErrHTML errMessage={userStatus} />}
        </div>
      }

      <ToastContainer />
    </div>
  )
}

export default UserEdit