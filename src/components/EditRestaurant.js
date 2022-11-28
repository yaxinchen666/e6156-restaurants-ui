import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

const EditRestaurant = () => {
  const id = useParams().id
  const [restaurant, setRestaurant] = useState()
  const [restName, setRestName] = useState()
  const [restLoc, setRestLoc] = useState()
  const [restSize, setRestSize] = useState()

  useEffect(() => {
    axios.get(`https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/restaurants/${id}`)
      .then(
        res => {
          console.log(res)
          const rest_data = res['data']
          setRestaurant(rest_data)
          setRestName(rest_data.rest_name)
          setRestLoc(rest_data.rest_location)
          setRestSize(rest_data.rest_size)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  }, [])

  const submitChange = (e) => {
    const rest_data = {
      "rest_name": restName,
      "rest_location": restLoc,
      "rest_size": restSize
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    axios.put(`https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/restaurants/${id}`, rest_data, config)
      .then(
        res => {
          const rest_data = res['data']
          setRestaurant(rest_data)
          setRestName(rest_data.rest_name)
          setRestLoc(rest_data.rest_location)
          setRestSize(rest_data.rest_size)
        }
      )
      .catch(
        error => {
          alert(error)
        }
      )
    e.preventDefault()
  }

  return (
    <>
      {restaurant == undefined ? null :
        <Container>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control value={restName} onChange={e => setRestName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control value={restLoc} onChange={e => setRestLoc(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Restaurant Size</Form.Label>
              <Form.Control value={restSize} onChange={e => setRestSize(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitChange}>
              Change
            </Button>
          </Form>
        </Container>
      }
    </>
  )
}

export default EditRestaurant