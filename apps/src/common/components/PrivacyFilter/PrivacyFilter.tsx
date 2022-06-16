import React, { FunctionComponent } from "react";
import { APP_NAME } from "../../../configuration";

interface PrivacyFilterProps {
  editable: boolean;
  onToggleEditable: () => void;
}

export const PrivacyFilter: FunctionComponent<PrivacyFilterProps> = ({ editable, onToggleEditable }) => (
  <div className="print:hidden bg-primary text-white rounded-lg p-4 mb-8">
    <div className="container">
      <div className="md:flex items-center">
        <div className="grow mb-4 md:mb-0 mr-0 md:mr-4">
          <h1 className="text-2xl mb-4">{APP_NAME} Privacy Filter Enabled</h1>
          <p>
            Remove sensitive information on this document by clicking on the edit button. Downloaded document remains
            valid.
          </p>
        </div>
        <button
          data-testid="button-toggle"
          onClick={() => {
            onToggleEditable();
          }}
          className="bg-white text-primary hover:text-dark-primary whitespace-nowrap p-2"
        >
          {editable ? "Done" : "Edit Document"}
        </button>
      </div>
    </div>
  </div>
);
