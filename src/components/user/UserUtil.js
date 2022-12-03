import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import Cookies from "universal-cookie";

// backend
//export const USER_URL = 'http://3.89.63.117:5011/users';
//export const ORDER_URL = 'http://cs6156order-env.eba-m5jcrnci.us-east-1.elasticbeanstalk.com/allOrderProfiles';
export const LOGIN_URL = 'http://ec2-18-222-34-48.us-east-2.compute.amazonaws.com:5011/login'
export const USER_URL = 'https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/users'

export const GOOGLE_CLIENT_ID = '432700070169-7eruhqjdadcqvmmh8ql54mij59vtpf5k.apps.googleusercontent.com'

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
    axios.get( USER_URL + '/' + cookies.get('id'), {
      headers: {
        'Authorization': cookies.get('token')
      }
    })
      .then(response => {
        console.log(response)
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
        console.log(err.request)
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

export const UserItemsList = (data_endpoint, data_key, title, layout) => {
  const [items, setItems] = useState([]);
  const [userStatus, setUserStatus] = useState(USER_STATUS.REQUEST_NOT_READY);

  const cookies = new Cookies();

  const itemsPerPage = 4;
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getItems = (curPage) => {
    if (cookies.get('id') === undefined) {
      setUserStatus(USER_STATUS.NOT_LOGIN_ERR);
    } else {
      const accountId = cookies.get('id');
      const data_url = USER_URL + '/' + accountId + '/' + data_endpoint;
      axios.get(data_url+
        '?page=' + curPage + '&per_page=' + itemsPerPage,
        {
          headers: {
            'Authorization': cookies.get('token')
          }
        })
        .then(response => {
          setUserStatus(USER_STATUS.VALID);
          //console.log(typeof(response.data.Restaurants));
          //setRestaurants(response.data.Restaurants);
          setItems(response.data[data_key]);
          setPageCount(response.data['numberPages']);
        })
        .then()
        .catch(err => {
          if (err.response.status === 440) {
            setUserStatus(USER_STATUS.SESSION_EXPIRED_ERR);
          } else if (err.response.status === 401) {
            setUserStatus(USER_STATUS.AUTH_FAILED_ERR);
          } else {
            if (err.response.data === "USER NOT FOUND") {
              setUserStatus(USER_STATUS.NOT_FOUND_ERR);
            } else if (err.response.data === "NOT FOUND") {
              setUserStatus(USER_STATUS.VALID);
              setItems([]);
            } else {
              setUserStatus(USER_STATUS.NOT_FOUND_ERR);
              console.log(err);
            }
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
      {userStatus === USER_STATUS.REQUEST_NOT_READY ?
        ''
        :
        <div>
          {userStatus === USER_STATUS.VALID ?
            <UserExistsHTML />
            : <UserErrHTML errMessage={userStatus} />}
        </div>
      }
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