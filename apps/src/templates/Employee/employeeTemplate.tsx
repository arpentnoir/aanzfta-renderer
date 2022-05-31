import React, { FunctionComponent } from "react";
import { v2 } from "@govtechsg/open-attestation";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { css } from "@emotion/core";

const style = css`
  pre {
    background-color: lightgray;
    overflow-wrap: anywhere;
    white-space: break-spaces;
  }
`;

interface RelatedLink {
  type: string;
  target: string;
  linkRelationship: string;
}

export interface EmployeeTemplateCertificate extends v2.OpenAttestationDocument {
  credentialSubject: {
    employee: string;
  };
  issuer: {
    name: string;
  };
  relatedLink: RelatedLink[];
  $template: v2.TemplateObject;
}

export const EmployeeTemplate: FunctionComponent<TemplateProps<EmployeeTemplateCertificate> & {
  className?: string;
}> = ({ document, className = "" }) => {
  return (
    <div css={style} className={className} id="custom-template">
      <div>
        <h1>{document.issuer.name}</h1>
        <h3>Employee: {document.credentialSubject.employee}</h3>
        <h3>
          <a data-testid="testing" target="_blank" rel="noopener noreferrer" href={document.relatedLink[0].target}>
            Qualification
          </a>
        </h3>
      </div>
    </div>
  );
};
