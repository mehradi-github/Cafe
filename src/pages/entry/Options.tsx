import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption, { OptionProps } from './ScoopOption';
import ToppingOption from './ToppingOption';
interface P {
  optionType: string;
}
const Options: FC<P> = ({ optionType }) => {
  const [items, setItems] = useState<OptionProps[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/${optionType}`)
      .then((res) => setItems(res.data))
      .catch();
  }, [optionType]);

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
