import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
interface P {
  variant?: Variant;
  msg?: string;
}
const AlertBanner: FC<P> = ({ variant, msg }) => {
  const alertMsg: string = msg || 'An unexpected error ocurrd.';
  const alertVariant: Variant = variant || 'danger';
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMsg}
    </Alert>
  );
};

export default AlertBanner;
