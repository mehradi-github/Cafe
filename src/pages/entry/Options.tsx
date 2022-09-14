import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import {
  OptionType,
  pricePerItem,
  useOrderDetails,
} from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import AlertBanner from '../common/AlertBanner';
import ScoopOption, { OptionProps } from './ScoopOption';
import ToppingOption from './ToppingOption';
interface P {
  optionType: OptionType;
}
const Options: FC<P> = ({ optionType }) => {
  const [items, setItems] = useState<OptionProps[]>([]);
  const [error, setError] = useState(false);
  const { totals, updateItemCount } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);

  if (error) return <AlertBanner />;
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem.get(optionType))} each</p>
      <p>
        {title} total: {totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};
export default Options;
