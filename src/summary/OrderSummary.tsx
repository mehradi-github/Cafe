import React, { FC, Fragment, ReactElement } from 'react';
import { useOrderDetails } from '../contexts/OrderDetails';
import SummaryForm, { OrderPhase } from './SummaryForm';

const OrderSummary: FC<OrderPhase> = ({ setOrderPhase }) => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopList: ReactElement[] = Array.from(
    optionCounts.scoops.entries()
  ).map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  let toppingsDisplay: ReactElement | undefined;

  if (totals.toppings !== '$0.00') {
    const toppingList: ReactElement[] = Array.from(
      optionCounts.toppings.keys()
    ).map((key) => <li key={key}>{key}</li>);

    toppingsDisplay = (
      <Fragment>
        <h2>Toppings: {totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </Fragment>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
export default OrderSummary;
