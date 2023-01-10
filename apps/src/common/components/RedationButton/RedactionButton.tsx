import React, { FunctionComponent } from 'react';

interface RedactionButtonProps {
  edit: boolean;
  removable: boolean;
  onPress: () => void;
}

export const RedactionButton: FunctionComponent<RedactionButtonProps> = ({
  onPress,
  edit,
  removable
}) => {
  return (
    <>
      {edit && removable && (
        <span
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            onPress();
          }}
        >
          [Redact]
        </span>
      )}
    </>
  );
};
