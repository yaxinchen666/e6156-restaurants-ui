import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {USER_URL} from './UserUtil';

const UserRegister = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(user_params => ({...user_params, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // check name & password is valid
    const NAME_REGEX = /^[A-z]{1,24}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
    if (!NAME_REGEX.test(user.firstname) || !NAME_REGEX.test(user.lastname)) {
      toast.error("Invalid name. Name should contain only characters and be of length 1 - 24");
      return;
    }
    if (!PWD_REGEX.test(user.password)) {
      toast.error("Invalid password." +
        "Password should contain at least 1 lowercase character, 1 uppercase character, and 1 digit;" +
        " it should be of length 6 - 24");
      return;
    }

    // TODO send register call to backend
    try {
      let formData = new FormData();
      formData.append('FirstName', user.firstname);
      formData.append('LastName', user.lastname);
      formData.append('Email', user.email);
      formData.append('Password', user.password);
      const response = await axios.post(USER_URL, formData);
      // console.log(response) // response.data {AccountID: 1, ...}
      if (response.status === 200) {
        toast.success("Registration success.");
      } else {
        toast.error("Failed to create user.");
      }
      setUser({firstname: '', lastname: '', email: '', password: ''});
      // return navigate('/user/login');
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  }

  return (
    <div>
      <br />
      <h1 className={"reg-font"}> Restaurants </h1>
      <h2 className={"reg-font"}> User Registration </h2>
      <br />
      <form onSubmit={handleSubmit} method="post" className = "log-form">
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

        <label className="log-label">
          Email Address
        </label>
        <input className="log-input" type="email" id = "email" name = "email"  required value={user.email} onChange={handleChange} />

        <br />

        <label className="log-label">
          Password
        </label>
        <input className="log-input"  type="password" id = "password" name = "password"  required value={user.password} autoComplete="true" onChange={handleChange} />

        <br />
        <br />

        <div className="container-log-btn">
          <button type="submit" name = "btn_submit" className="log-form-btn">
            <span>REGISTER</span>
          </button>
        </div>
        <br />

        <ToastContainer />
      </form>

      <br/><br/>
      <p className={"sign-in-font"}> Already have an account? <Link className='sign-in-link' to="/user/login"> Sign in </Link> </p>

    </div>
  )
}

export default UserRegister
