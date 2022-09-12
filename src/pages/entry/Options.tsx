import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner';
import ScoopOption, { OptionProps } from './ScoopOption';
import ToppingOption from './ToppingOption';
interface P {
  optionType: string;
}
const Options: FC<P> = ({ optionType }) => {
  const [items, setItems] = useState<OptionProps[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);

  if (error) return <AlertBanner />;
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const optionItmes = items.map((prop) => (
    <ItemComponent
      key={prop.name}
      name={prop.name}
      imagePath={prop.imagePath}
    />
  ));

  return <Row>{optionItmes}</Row>;
};
export default Options;
