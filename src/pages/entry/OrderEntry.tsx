import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

const OrderEntry: FC = () => {
  const { totals } = useOrderDetails();

  const orderDisabled = totals.scoops === '$0.00';

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
      <Button disabled={orderDisabled}>Order Sundae!</Button>
    </div>
  );
};
export default OrderEntry;
