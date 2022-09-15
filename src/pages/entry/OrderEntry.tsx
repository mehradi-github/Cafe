import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { OrderPhase } from '../../summary/SummaryForm';
import Options from './Options';

const OrderEntry: FC<OrderPhase> = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  const orderDisabled = totals.scoops === '$0.00';

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  );
};
export default OrderEntry;
