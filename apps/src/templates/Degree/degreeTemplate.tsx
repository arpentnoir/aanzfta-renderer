import React, { FunctionComponent, useState } from "react";
import { v3 } from "@govtechsg/open-attestation";
import { RedactableValue, TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { PrivacyFilter } from "../../common/components/PrivacyFilter/PrivacyFilter";
import { IconRedact } from "../../common/components/IconRedact/IconRedact";

export interface DegreeTemplateCertificate extends v3.OpenAttestationDocument {
  credentialSubject: {
    recipient: string;
    degree: string;
    gpa: string;
    club: string;
    award: string;
    thesis: string;
  };
  issuer: any;
}

type Values = {
  degree: string;
  recipient: string;
  gpa: string;
  club: string;
  award: string;
  thesis: string;
};

export const DegreeTemplate: FunctionComponent<TemplateProps<DegreeTemplateCertificate> & {
  className?: string;
}> = ({ document, handleObfuscation, className = "" }) => {
  const [editable, setEditable] = useState(false);

  // Expected VC Keys
  const keys = ["degree", "recipient", "gpa", "club", "award", "thesis"];

  // Get all redacted keys
  const redactedKeys = keys.filter(key => !(key in document?.credentialSubject));

  const values: Values = {
    recipient: document?.credentialSubject.recipient,
    degree: document?.credentialSubject.degree,
    gpa: document?.credentialSubject.gpa,
    award: document?.credentialSubject.award,
    club: document?.credentialSubject.club,
    thesis: document?.credentialSubject.thesis
  };

  return (
    <div className={className} id="degree-template">
      <PrivacyFilter editable={editable} onToggleEditable={() => setEditable(!editable)} />

      <div className="p-4">
        <h1 className="text-3xl text-primary font-bold mb-4 text-center">{document.issuer.name}</h1>
        {/* Display values */}
        <div>
          {(Object.keys(values) as (keyof Values)[]).map(valueKey => {
            return (
              <div key={valueKey} className="text-lg font-bold text-primary grid grid-cols-8">
                <div className="col-span-4  md:col-span-2">
                  <p className="h3 capitalize">{valueKey}:</p>
                </div>

                {/* There are three possible states for a value:
                    Redacted: value is part of schema but not present in VC
                    Available: value is part of schema and present in VC
                    Missing: value is part of schema and present in VC but has not value
                */}
                <div className="col-span-4  md:col-span-6">
                  {redactedKeys.includes(valueKey) ? (
                    // Redacted
                    <p className="h3 capitalize text-[#262829]">**Redacted**</p>
                  ) : !!values[valueKey] ? (
                    // Available
                    <RedactableValue
                      editable={editable}
                      value={values[valueKey]}
                      onRedactionRequested={() => handleObfuscation(`credentialSubject.${valueKey}`)}
                      iconRedact={<IconRedact />}
                    />
                  ) : (
                    // Missing
                    <p className="h3 capitalize">**Field value does not exist**</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
