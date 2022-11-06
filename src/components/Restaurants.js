import React, {useEffect, useState} from 'react'
import axios from 'axios';

import { Container } from 'react-bootstrap';
import Pagination from './Pagination';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([
      // {
      //   'rest_id': 1,
      //   'rest_name': 'Tuscany Steakhouse',
      //   'rest_location': '117 W 58th St, New York, NY 10019',
      //   'rest_size': 30
      // },
      // {
      //   'rest_id': 2,
      //   'rest_name': 'Gattopardo',
      //   'rest_location': '13-15 W 54th St, New York, NY 10019',
      //   'rest_size': 25
      // },
      // {
      //   'rest_id': 3,
      //   'rest_name': 'Carnegie Diner & Cafe',
      //   'rest_location':  '205 W 57th St, New York, NY 10019',
      //   'rest_size': 20
      // },
      // {
      //   'rest_id': 4,
      //   'rest_name': 'Mulligan\'s Pub',
      //   'rest_location': '159 1st St, Hoboken, NJ 07030',
      //   'rest_size': 30
      // },
      // {
      //   'rest_id': 5,
      //   'rest_name': 'Mills Tavern',
      //   'rest_location': '125 Washington St, Hoboken, NJ 07030',
      //   'rest_size': 25
      // },
    ])

  useEffect(() => {
    axios.get("https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/restaurants")
    .then(
      res => {
        console.log(res)
        setRestaurants(res['data'])
      }
    )
    .catch(
      error => {
        console.log(error)
      }
    )
  }, []) 

  if (restaurants.length === 0) {
    return <>Still loading...</>;
  } else {
    return (
        <Container>
        <Pagination itemsPerPage={3} items={restaurants}/>
        </Container>
      )
  }
}

export default Restaurants