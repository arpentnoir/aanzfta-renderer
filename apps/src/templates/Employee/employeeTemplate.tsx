import React, { FunctionComponent, useState } from "react";
import { v3 } from "@govtechsg/open-attestation";
import { RedactableValue, TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { PrivacyFilter, IconRedact } from "../../common/components";

interface RelatedLink {
  type: string;
  target: string;
  linkRelationship: string;
}

export interface EmployeeTemplateCertificate extends v3.OpenAttestationDocument {
  credentialSubject: {
    employee: string;
  };
  issuer: any;
  relatedLink: RelatedLink[];
}

type Values = {
  employee: string;
  qualification: string;
};

export const EmployeeTemplate: FunctionComponent<TemplateProps<EmployeeTemplateCertificate> & {
  className?: string;
}> = ({ document, handleObfuscation, className = "" }) => {
  const [editable, setEditable] = useState(false);

  // Expected VC Keys
  const keys = ["employee", "target"];

  // Get all redacted keys
  const redactedKeys = keys.filter(key => !(key in document?.credentialSubject || key in document?.relatedLink[0]));

  const values: Values = {
    employee: document?.credentialSubject.employee,
    qualification: document?.relatedLink[0]?.target
  };

  return (
    <div className={className} id="degree-template">
      <PrivacyFilter editable={editable} onToggleEditable={() => setEditable(!editable)} />

      <div className="p-4">
        <h1 className="text-3xl text-primary font-bold mb-4 text-center">{document.issuer.name}</h1>
        {/* Display values */}
        <div>
          {/* Employee */}
          <div className="text-lg font-bold text-primary grid grid-cols-8">
            <div className="col-span-4  md:col-span-2">
              <p className="h3 capitalize">Employee:</p>
            </div>

            <div className="col-span-4  md:col-span-6">
              {redactedKeys.includes("employee") ? (
                <p className="h3 capitalize">**Redacted**</p>
              ) : !!values.employee ? (
                <RedactableValue
                  editable={editable}
                  value={values.employee}
                  onRedactionRequested={() => handleObfuscation(`credentialSubject.employee`)}
                  iconRedact={<IconRedact />}
                />
              ) : (
                <p className="h3 capitalize">**Field value does not exist**</p>
              )}
            </div>
          </div>

          {/* Qualification */}
          <div className="text-lg font-bold text-primary grid grid-cols-8">
            <div className="col-span-4  md:col-span-2">
              <p className="h3 capitalize">Qualification:</p>
            </div>

            <div className="col-span-4  md:col-span-6">
              {redactedKeys.includes("target") ? (
                <p className="h3 capitalize">**Redacted**</p>
              ) : !!values.qualification ? (
                <div>
                  <a href={values.qualification} target="_blank" rel="noopener noreferrer" data-testid="verify-link">
                    Verify Link
                  </a>
                  <RedactableValue
                    editable={editable}
                    value=" "
                    onRedactionRequested={() => handleObfuscation("relatedLink.0.target")}
                    iconRedact={<IconRedact />}
                  />
                </div>
              ) : (
                <p className="h3 capitalize">**Field value does not exist**</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
