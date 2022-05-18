import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { css } from "@emotion/core";
import { CustomTemplateCertificate } from "../samples";

const style = css`
  pre {
    background-color: lightgray;
    overflow-wrap: anywhere;
    white-space: break-spaces;
  }
`;

export const CertificateOfOriginTemplate: FunctionComponent<TemplateProps<CustomTemplateCertificate> & {
  className?: string;
}> = ({ document, className = "" }) => {
  return (
    <div css={style} className={className} id="custom-template">
      <div>
        <h1>asdasdasd</h1>
        <pre>{JSON.stringify(document, null, 2)}</pre>
      </div>
    </div>
  );
};
