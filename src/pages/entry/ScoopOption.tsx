import React, { FC } from 'react';
import { Col } from 'react-bootstrap';
export type OptionProps = {
  name: string;
  imagePath: string;
};
const ScoopOption: FC<OptionProps> = ({ name, imagePath }) => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:8081/${name}`}
        alt={`${name} scoop`}
        style={{ width: '75%' }}
      />
    </Col>
  );
};
export default ScoopOption;
