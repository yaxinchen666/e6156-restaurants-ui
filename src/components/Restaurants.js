import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { Container } from 'react-bootstrap';
import Pagination from './Pagination';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [restName, setRestName] = useState("")
  const [restLoc, setRestLoc] = useState("")
  const [restSize, setRestSize] = useState("")

  const addRest = () => {
    console.log(restName, restLoc, restSize)
    const rest_data = {
      "rest_name": restName,
      "rest_location": restLoc,
      "rest_size": restSize
    }
    axios.post("https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/restaurants", rest_data)
      .then(
        res => {
          alert(res)
          handleClose()
        }
      )
      .catch(
        error => {
          alert(error)
          handleClose()
        }
      )
  }

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

  const deleteRest = (id) => {
    console.log(id)
    axios.delete(`https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/restaurants/${id}`)
      .then(
        res => {
          console.log(res)
          alert('success!')
          window.location.reload();
        }
      )
      .catch(
        error => {
          alert(error)
        }
      )
  }

  const layout = (rest, i) => {
    return (
      <Card key={i}>
        <Card.Header as="h5">{rest.rest_name}
          <RiDeleteBin6Line onClick={e => deleteRest(rest.rest_id)} />
          <BiEditAlt onClick={e => navigate(`/restaurant/${rest.rest_id}/edit`)} />
        </Card.Header>
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
        <p>View All Restaurants <AiOutlineFolderAdd onClick={handleShow} /> </p>
        <Pagination itemsPerPage={3} items={restaurants} layout={layout} />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Restaurant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addRest}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

export default Restaurants