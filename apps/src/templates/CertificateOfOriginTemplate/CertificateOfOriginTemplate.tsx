import React, { FunctionComponent } from "react";
import { Document, Page } from "react-pdf";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";

import { CertificateOfOrigin } from "../samples/certificateOfOriginTemplateSample";

export const CertificateOfOriginTemplate: FunctionComponent<TemplateProps<CertificateOfOrigin> & {
  className?: string;
}> = ({ document, className = "" }) => {
  return (
    <div className={className} id="certificate-of-origin-template">
      <div>
        <h1>Certificate of Origin</h1>
        {/* <pre>{JSON.stringify(document, null, 2)}</pre> */}
        <div>
          <Document
            file={document.credentialSubject.supplyChainConsignment?.documentAttachment.documentAttachment}
            onLoadError={console.error}
          >
            <Page pageNumber={1} className="border border-cloud-200" />
          </Document>
        </div>
      </div>
    </div>
  );
};
