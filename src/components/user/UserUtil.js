import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";

// backend
//export const USER_URL = 'http://3.89.63.117:5011/users';
//export const ORDER_URL = 'http://cs6156order-env.eba-m5jcrnci.us-east-1.elasticbeanstalk.com/allOrderProfiles';
export const USER_URL = 'https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/users'

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
        <Link className='cancel-link reg-font' to={`/user/${accountId}/home`}> <p>&larr;  Back to home page </p> </Link>
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
            : <UserNotFoundHTML />}
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