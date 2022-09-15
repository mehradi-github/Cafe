import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react';
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';

export declare type Phase = 'inProgress' | 'review' | 'completed';
export interface OrderPhase {
  setOrderPhase: (p: Phase) => void;
}

const SummaryForm: FC<OrderPhase> = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTcChecked(event.target.checked);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setOrderPhase('completed');
  };

  const popover = (
    <Popover id="termsandconditions-popover">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={handleChange}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
};
export default SummaryForm;
