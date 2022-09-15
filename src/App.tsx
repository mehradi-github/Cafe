import React, { FC, useState } from 'react';
import { Container } from 'react-bootstrap';
import OrderConfirmation from './confirmation/OrderConfirmation';
// import logo from './logo.svg';
// import './App.css';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './summary/OrderSummary';
import { OrderPhase } from './summary/SummaryForm';

const App: FC = () => {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component: FC<OrderPhase> | undefined;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
      Component = OrderEntry;
      break;
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
};
export default App;
