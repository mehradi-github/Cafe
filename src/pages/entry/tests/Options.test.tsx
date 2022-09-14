import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const altText = scoopImages.map((x) => x.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
