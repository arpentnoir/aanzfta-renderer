import React from 'react';
import { render } from '@testing-library/react';
import { PrivacyFilter } from './PrivacyFilter';

describe('privacyFilter', () => {
  const toggleEditable = jest.fn();

  it('should render Edit document when editable is false', async () => {
    const editable = false;

    const { getByText } = render(
      <PrivacyFilter editable={editable} onToggleEditable={toggleEditable} />
    );

    expect(getByText('Edit Document')).toBeDefined();
  });

  it('should render Done when editable is true', async () => {
    const editable = true;

    const { getByText } = render(
      <PrivacyFilter editable={editable} onToggleEditable={toggleEditable} />
    );

    expect(getByText('Done')).toBeDefined();
  });

  it('should call toggleEditable when toggle button is click', async () => {
    const editable = false;

    const { getByTestId } = render(
      <PrivacyFilter editable={editable} onToggleEditable={toggleEditable} />
    );

    const toggleButton = getByTestId('button-toggle');

    toggleButton.click();

    expect(toggleEditable).toHaveBeenCalledWith();
  });
});
