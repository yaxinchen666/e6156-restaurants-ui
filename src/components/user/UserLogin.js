import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import axios from "axios";
import {LOGIN_URL, USER_URL, GOOGLE_CLIENT_ID} from "./UserUtil";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie"

const UserLogin = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const clientId = GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });


  const onSignInSuccess = async (credentialResponse) => {
    axios.post(LOGIN_URL, {'token': credentialResponse.tokenId})
      .then(response => {
        if (response.status === 200) {
          cookies.set('token', credentialResponse.tokenId, {path: '/'});
          cookies.set('id', jwt_decode(credentialResponse.tokenId)['sub']);
          toast.success("Login success.", {autoClose: 1000});
          setTimeout(() => {
            return navigate('/');
          }, 1000);
        } else {
          toast.error(response.data);
          console.log(response);
        }
      })
      .catch(err => {
        toast.error(err.response.data);
        console.log(err);
      })
  }

  const onSignInError = () => {
    toast.error('Login Failed');
    console.log('Login Failed');
  }

  return (
    <div>
      <br />
      <h2 className={""}> Log in with Google </h2>
      <br />

      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSignInSuccess}
        onFailure={onSignInError}
        cookiePolicy={'single_host_origin'}
      />

      <ToastContainer />

    </div>
  )
}

export default UserLogin