import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../contexts/OrderDetails';
import AlertBanner from '../pages/common/AlertBanner';
import { OrderPhase } from '../summary/SummaryForm';

const OrderConfirmation: FC<OrderPhase> = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [error, setError] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post(`http://localhost:8081/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }
  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading ...</div>;
  }
};
export default OrderConfirmation;
