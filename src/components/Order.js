import React from 'react'
import { useParams } from "react-router-dom";

const Order = () => {
    const rest_id = useParams().id
    return (
        <div>Order</div>
    )
}

export default Order