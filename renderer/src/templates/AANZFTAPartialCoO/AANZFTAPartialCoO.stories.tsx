import { document } from './sample';

import React from 'react';
import { AANZFTAPartialCoORender } from './AANZFTAPartialCoO';

export const defaultTemplate = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <AANZFTAPartialCoORender
        document={document as any}
        handleObfuscation={() => null}
      />
    </div>
  );
};

export default {
  title: 'templates/Certificate of Origin Partial',
  component: defaultTemplate
};
