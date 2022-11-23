import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import Cookies from "universal-cookie";

// backend
//export const USER_URL = 'http://3.89.63.117:5011/users';
//export const ORDER_URL = 'http://cs6156order-env.eba-m5jcrnci.us-east-1.elasticbeanstalk.com/allOrderProfiles';
export const LOGIN_URL = 'http://127.0.0.1:5000/login' // TODO
export const USER_URL = 'https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/users'

export const USER_STATUS = {
  VALID: "Valid",
  REQUEST_NOT_READY: "Request Not Ready",
  SESSION_EXPIRED_ERR: "Session Expired",
  NOT_LOGIN_ERR: "User Not Login",
  AUTH_FAILED_ERR: "Authentication Failed",
  NOT_FOUND_ERR: "User Not Found"
}

export const UserErrHTML = ({errMessage}) => {
  return (
    <div>
      <h1 className={"reg-font"}>Error: {errMessage}</h1>
      <h2 className={"sign-in-font"}> Please log in to continue. <Link className='sign-in-link' to="/user/login"> Log in </Link> </h2>
    </div>
  );
}

export const getUser = async (setAccountId, setUser, setUserStatus) =>{
  const cookies = new Cookies();
  if (cookies.get('id') === undefined) {
    setUserStatus(USER_STATUS.NOT_LOGIN_ERR);
  } else {
    setAccountId(cookies.get('id'));
    axios.get( USER_URL + '/' + cookies.get('id'))
      .then(response => {
        if (response.status === 200) {
          setUser({
            accountID: response.data.AccountID,
            firstname: response.data.FirstName,
            lastname: response.data.LastName,
            email: response.data.Email
          });
          setUserStatus(USER_STATUS.VALID);
        } else {
          setUserStatus(USER_STATUS.NOT_FOUND_ERR);
        }
      })
      .catch(err => {
        if (err.response.status === 440) {
          setUserStatus(USER_STATUS.SESSION_EXPIRED_ERR);
        } else if (err.response.status === 401) {
          setUserStatus(USER_STATUS.AUTH_FAILED_ERR);
        } else {
          setUserStatus(USER_STATUS.NOT_FOUND_ERR);
        }
      })
  }
}
// TODO...
export const UserItemsList = (data_url, data_key, title, layout) => {
  const [items, setItems] = useState([]);
  const accountId = useParams().id;
  const [requestReady, setRequestReady] = useState(false);
  const [userValid, setUserValid] = useState(true);

  const itemsPerPage = 4;
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getItems = (curPage) => {
    if (accountId) {
      axios.get(data_url+
        '?page=' + curPage + '&per_page=' + itemsPerPage)
        .then(response => {
          setUserValid(true);
          //console.log(typeof(response.data.Restaurants));
          //setRestaurants(response.data.Restaurants);
          setItems(response.data[data_key]);
          setPageCount(response.data['numberPages']);
        })
        .then(() => {setRequestReady(true);})
        .catch(err => {
          if (err.response.data === "USER NOT FOUND") {
            setUserValid(false);
          } else if (err.response.data === "NOT FOUND") {
            setUserValid(true);
            setItems([]);
          } else {
            console.log(err);
          }
        })
    }
  }

  useEffect(() => {
    getItems(curPage);
  },[]);
  const handlePageClick = (event) => {
    setCurPage(event.selected + 1);
    getItems(event.selected + 1);
  };

  const UserExistsHTML = () => {
    return (
      <div>
        <Link className='cancel-link reg-font' to={`/user/home`}> <p>&larr;  Back to home page </p> </Link>
        <br />
        <br />

        <h1 className={'reg-font'}> {title} </h1>
        <br />

        {items === null || items.length === 0 ? null : items.map(rest => layout(rest))}

      </div>
    )
  }

  return (
    <div>
      {requestReady ?
        <div>
          {userValid ?
            <UserExistsHTML />
            : <UserErrHTML errMessage={USER_STATUS.NOT_FOUND_ERR} />}
        </div>
        : ''}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );

}