import React from 'react';
import { render } from '@testing-library/react';
import { IconRedact } from './IconRedact';

describe('iconRedact', () => {
  it('should render correclty', () => {
    const { getByText } = render(<IconRedact />);

    expect(getByText('[Remove]')).toBeDefined();
  });
});
