import React, { FC } from 'react';
import { Col, Form } from 'react-bootstrap';
import { OptionProps } from './ScoopOption';

const ToppingOption: FC<OptionProps> = ({
  name,
  imagePath,
  updateItemCount,
}) => {
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:8081/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? '1' : '0');
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  );
};
export default ToppingOption;
