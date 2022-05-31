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

export interface DegreeTemplateCertificate extends v2.OpenAttestationDocument {
  credentialSubject: {
    recipient: string;
    degree: string;
  };
  issuer: {
    name: string;
  };
  $template: v2.TemplateObject;
}

export const DegreeTemplate: FunctionComponent<TemplateProps<DegreeTemplateCertificate> & {
  className?: string;
}> = ({ document, className = "" }) => {
  return (
    <div css={style} className={className} id="custom-template">
      <div>
        <h1>{document.issuer.name}</h1>
        <h3>Recipient: {document?.credentialSubject.recipient}</h3>
        <h3>Degree: {document?.credentialSubject.degree}</h3>
      </div>
    </div>
  );
};
