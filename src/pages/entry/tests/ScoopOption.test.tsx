import { logRoles, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ScoopOption from '../ScoopOption';

test('indicate if scoop count is non-int or out of range', async () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);
  screen.logTestingPlaygroundURL();
  //screen.debug();
  const vanillaInput = screen.getByRole('spinbutton');
  //logRoles(vanillaInput);
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
