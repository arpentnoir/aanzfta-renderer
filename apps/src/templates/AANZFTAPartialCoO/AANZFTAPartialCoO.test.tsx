import React from 'react';
import { render } from '@testing-library/react';
import { AANZFTAPartialCoORender } from './AANZFTAPartialCoO';
import { document } from './sample';

describe('partial Certificate Of Origin', () => {
  it('should render pdf', async () => {
    const { getByTestId, queryByText } = render(
      <AANZFTAPartialCoORender
        document={document as any}
        handleObfuscation={jest.fn()}
      />
    );

    const loadingText = await queryByText('Loading PDF...');
    expect(loadingText).toBeNull();

    const doc = getByTestId('pdf-document');
    expect(doc).toBeDefined();
  });
  it("should show unable to load if pdf isn't available", async () => {
    const { getByText } = render(
      <AANZFTAPartialCoORender
        document={{} as any}
        handleObfuscation={jest.fn()}
      />
    );

    const element = getByText('Unable to load');
    expect(element).toBeDefined();
  });
});
