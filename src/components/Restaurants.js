import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ReactPaginate from 'react-paginate';
import { Container } from 'react-bootstrap';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([
      {
        'rest_id': 1,
        'rest_name': 'Tuscany Steakhouse',
        'rest_location': '117 W 58th St, New York, NY 10019',
        'rest_size': 30
      },
      {
        'rest_id': 2,
        'rest_name': 'Gattopardo',
        'rest_location': '13-15 W 54th St, New York, NY 10019',
        'rest_size': 25
      },
      {
        'rest_id': 3,
        'rest_name': 'Carnegie Diner & Cafe',
        'rest_location':  '205 W 57th St, New York, NY 10019',
        'rest_size': 20
      }
    ])

  // useEffect(() => {
  //   axios.get("getAllResults")
  //   .then(
  //     res => {
  //       console.log(res)
  //       setRestaurants(res)
  //     }
  //   )
  //   .catch(
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }, []) 

  if (restaurants.length === 0) {
    return <>Still loading...</>;
  } else {
    return (
        <Container>
        {restaurants.map(rest => {
            return (
            <Card style={{ 'margin-bottom': '20px' }}>
                <Card.Header as="h5">{rest.rest_name}</Card.Header>
                <Card.Body>
                    <Card.Text>{rest.rest_location}</Card.Text>
                    <Card.Text>size: {rest.rest_size}</Card.Text>
                </Card.Body>
            </Card>
            )
        })}
        </Container>
        
      )
  }
}

export default Restaurants