import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";


const Order = () => {
    const rest_id = useParams().id
    const [dishes, setDishes] = useState([])
    const [orders, setOrders] = useState([])
    const cookies = new Cookies();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/restaurants/dishes/${rest_id}`)
            .then(
                res => {
                    const dish_data = res['data']
                    console.log(dish_data)
                    setDishes(dish_data)
                    const numDishes = dish_data.length;
                    setOrders(Array(numDishes).fill(0));
                }
            )
            .catch(
                error => {
                    toast.error("No dishes from the restaurant so far!")
                    console.log(error)
                }
            )
    }, [])

    const incrementCount = (i) => {
        const newOrders = [...orders];
        newOrders[i] += 1;
        setOrders(newOrders);
    }

    const decrementCount = (i) => {
        const newOrders = [...orders];
        if (newOrders[i] > 0) newOrders[i] -= 1;
        setOrders(newOrders);
    }

    const submitOrder = () => {
        const orderData = {}
        orderData.restId = rest_id
        orderData.total = 200;
        const today = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
        orderData.orderTime = today
        const orderedDishes = []
        dishes.forEach((dish, idx) => {
            for (let i = 0; i < orders[idx]; ++i) {
                orderedDishes.push({ 'dishId': dish.dish_id })
            }
        })
        orderData.dishList = orderedDishes;
        if (orderedDishes.length === 0) {
            toast.error("Can not submit empty order")
            return;
        }
        console.log(orderData)
        const accountId = cookies.get('id');
        axios.post(`https://e3pejg5go6.execute-api.us-east-1.amazonaws.com/order/${accountId}`, orderData)
            .then(
                res => {
                    toast.success('Order Submitted!')
                    console.log(res)
                    const numDishes = dishes.length;
                    setOrders(Array(numDishes).fill(0));
                    setTimeout(() => {
                      return navigate('/order-info/' + JSON.parse(/\{([^}]+)\}/.exec(res.data.data)[0]).data);
                    }, 2000);
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    const dishItems = dishes.map((dish, i) => {
        return (
            <Card key={i}>
                <Card.Header as="h5">{dish.dish_name}</Card.Header>
                <Card.Body>
                    <Card.Text>flavor: {dish.flavor}</Card.Text>
                    <Card.Text>description: {dish.dish_description}</Card.Text>
                    <Card.Text>serving size: {dish.serve_size}</Card.Text>
                    <div className='input-group justify-content-center'>
                        <Button onClick={() => incrementCount(i)} variant="outline-info">+</Button>
                        <div className='m-2'>{orders[i]}</div>
                        <Button onClick={() => decrementCount(i)} variant="outline-info">-</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    })

    if (dishes.length === 0) return (
        <Container>
            <p>No dishes from the restaurant so far!</p>
        </Container>
    );

    if (cookies.get('id') === undefined) {
      return (
        <Container>
          <p>You need to login first. <Link to="/user/login"> Log in </Link> </p>
        </Container>
      )
    }

    return (
        <Container>
            <p>Please order here:</p>
            {dishItems}
            <Button className='mt-3' variant="outline-info" size="sm" onClick={submitOrder}>Submit Your Order</Button>
            <ToastContainer />
        </Container>
    )
}

export default Order