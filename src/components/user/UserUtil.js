import axios from "axios";
import React from "react";
import {Link} from "react-router-dom";

// backend
export const USER_URL = 'http://3.89.63.117:5011/users';
export const ORDER_URL = 'http://cs6156order-env.eba-m5jcrnci.us-east-1.elasticbeanstalk.com/allOrderProfiles';

export const UserNotFoundHTML = () => {
  return (
    <h1 className={"reg-font"}>Error: User Not Found</h1>
  );
}

export const getUser = async (accountId, setUser, setUserValid) =>{
  if(accountId) {
    const response = await axios.get( USER_URL + '/' + accountId);
    if (response.status === 200) {
      setUser({
        accountID: response.data.AccountID,
        firstname: response.data.FirstName,
        lastname: response.data.LastName,
        email: response.data.Email
      });
      setUserValid(true);
    } else {
      setUserValid(false);
    }
  }
}