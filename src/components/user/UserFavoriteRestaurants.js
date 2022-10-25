import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './User.css'

import {getUser, USER_URL, UserNotFoundHTML} from './UserUtil';
import Restaurants from "../Restaurants";

const UserFavoriteRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  /*
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
  });
   */
  const accountId = useParams().id;
  const [requestReady, setRequestReady] = useState(false);
  const [userValid, setUserValid] = useState(true);

  useEffect(() => {
    const getRestaurants = async () => {
      if (accountId) {
        try {
          const response = await axios.get( USER_URL + '/' + accountId + '/FavoriteRestaurants');
          console.log(response);
          if (response.status === 200) {
            setUserValid(true);
            //console.log(typeof(response.data.Restaurants));
            setRestaurants(response.data.Restaurants);
            //console.log(typeof(restaurants));
          } else {
            setUserValid(false);
          }
        } catch (err) {
          if (err.response.data === "USER NOT FOUND") {
            setUserValid(false);
          } else if (err.response.data === "NOT FOUND") {
            setUserValid(true);
            setRestaurants([]);
          } else {
            console.log(err);
          }
        }
      }
    }
    getRestaurants().then(
      () => {setRequestReady(true);}
    );
  },[]);

  const ListRestaurants = ({ items }) => (
    <div className={'restaurant-blocks'}>
      {items.map((item) => (
        <div className={'restaurant-block'}>
          <h2 className={'restaurant-font'}> {item.RestaurantName} </h2>
        </div>
      ))}
    </div>
  );

  const UserExistsHTML = () => {
    return (
      <div>
        <Link className='cancel-link reg-font' to={`/user/${accountId}/home`}> <p>&larr;  Back to home page </p> </Link>
        <br />
        <br />

        <h1 className={'reg-font'}> Favorite Restaurants </h1>

        <ListRestaurants items={restaurants} />
      </div>
    )
  }

  return (
    <div>
      {requestReady ? <div> {userValid ? <UserExistsHTML /> : <UserNotFoundHTML />}</div> : ''}
    </div>
  );
}

export default UserFavoriteRestaurants