import React, { FunctionComponent, useState } from 'react';
import { RedactionButton } from '..';

interface DocumentSegmentProps {
  edit: boolean;
  removable?: boolean;
  handleObfuscation: () => void;
  sectionTitle: string | React.ReactNode | React.ReactNodeArray;
  sectionBody: string | React.ReactNode | React.ReactNodeArray;
  minBodyHeight?: string | number;
  height?: string | number;
  flex?: string | number;
  redacted?: boolean;
}

export const DocumentSegment: FunctionComponent<DocumentSegmentProps> = ({
  handleObfuscation,
  sectionTitle,
  sectionBody,
  height,
  minBodyHeight = 80,
  flex,
  edit = false,
  removable = true,
  redacted = false
}) => {
  const [isRedacted, setRedacted] = useState(redacted);

  return (
    <div className="border p-2" style={{ height: height, flex: flex }}>
      <div>
        {sectionTitle}{' '}
        <RedactionButton
          edit={edit && !isRedacted}
          removable={removable}
          onPress={() => {
            handleObfuscation();
            setRedacted(!isRedacted);
          }}
        />
      </div>
      <div style={{ minHeight: minBodyHeight }}>
        {isRedacted ? '**Redacted**' : sectionBody}
      </div>
    </div>
  );
};
