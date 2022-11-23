import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from "react-router-dom";
import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import {LOGIN_URL, USER_URL} from "./UserUtil";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie"

// TODO return error code (session expired etc); user not login; logout

const UserLogin = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const onSignInSuccess = async (credentialResponse) => {
    axios.post(LOGIN_URL, {'token': credentialResponse.credential})
      .then(response => {
        if (response.status === 200) {
          cookies.set('token', credentialResponse.credential);
          cookies.set('id', jwt_decode(credentialResponse.credential)['sub']);
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
      <div className={"sign-in-button"}>
        <button onClick={onSignInSuccess}></button>
        <GoogleOAuthProvider clientId="432700070169-7eruhqjdadcqvmmh8ql54mij59vtpf5k.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={onSignInSuccess}
            onError={onSignInError}
          />
        </GoogleOAuthProvider>
      </div>

      <ToastContainer />

    </div>
  )
}

export default UserLogin