import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import { Container } from 'react-bootstrap';
import Pagination from './Pagination';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([])

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

  const layout = (rest) => {
    return (
      <Card style={{ 'margin-bottom': '20px' }}>
          <Card.Header as="h5">{rest.rest_name}</Card.Header>
          <Card.Body>
              <Card.Text>{rest.rest_location}</Card.Text>
              <Card.Text>size: {rest.rest_size}</Card.Text>
          </Card.Body>
      </Card>
      )
  };

  if (restaurants.length === 0) {
    return <>Still loading...</>;
  } else {
    return (
        <Container>
        <Pagination itemsPerPage={3} items={restaurants} layout={layout}/>
        </Container>
      )
  }
}

export default Restaurants