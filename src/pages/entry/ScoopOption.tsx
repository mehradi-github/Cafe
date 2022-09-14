import React, { ChangeEventHandler, FC, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
export type OptionProps = {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
};
const ScoopOption: FC<OptionProps> = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const currentValue = event.target.value;

    const currentValueFloat: number = parseFloat(currentValue);
    const valueIsValid: boolean =
      currentValueFloat >= 0 &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(valueIsValid);

    if (valueIsValid) updateItemCount(name, currentValue);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:8081/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
export default ScoopOption;
