import React, { FC } from 'react';
import Options from './Options';

const OrderEntry: FC = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
};
export default OrderEntry;
