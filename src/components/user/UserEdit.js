import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {getUser, USER_URL, UserNotFoundHTML} from './UserUtil';

const UserEdit = () => {
  const [user, setUser] = useState({
    accountID: '',
    firstname: '',
    lastname: '',
    email: ''  // backend: cannot edit email
  });
  const accountId = useParams().id;
  const [userRequestReady, setUserRequestReady] = useState(false);
  const [userValid, setUserValid] = useState(true);

  const navigate = useNavigate();

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
      const response = await axios.put(USER_URL + '/' + accountId, formData);
      if (response.status === 200) {
        toast.success("Update success.", {autoClose: 1000, hideProgressBar: true});
        setTimeout(() => {
          return navigate('/user/' + user.accountID + '/home');
        }, 1000);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (err) {
      toast.error("Failed to update user.");
      console.log(err);
    }
  }

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.delete(USER_URL + '/' + accountId);
    if (response.status === 200) {
      toast.success("Deletion success.");
      return navigate('/user/login');
    } else {
      toast.error("Failed to delete user.");
    }
  }

  return (
    <div>
      {userRequestReady ?
        <div>
          {userValid ?
            <div>
              <Link className='cancel-link reg-font' to={`/user/${user.accountID}/home`}> <p>&larr;  Back to home page </p> </Link>
              <br />

              <br />
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
            : <UserNotFoundHTML />}
        </div>
        : ''}

      <ToastContainer />
    </div>
  )
}

export default UserEdit