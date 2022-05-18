import { v2 } from "@govtechsg/open-attestation";

export interface CertificateOfOrigin extends v2.OpenAttestationDocument {
  name: string;
  foo?: {
    title: string;
  };
  $template: v2.TemplateObject;
}

export const customTemplateCertificate: CertificateOfOrigin = {
  name: "Coo",
  issuers: [
    {
      name: "institute of blockchain"
    }
  ],
  $template: {
    name: "custom",
    type: v2.TemplateType.EmbeddedRenderer,
    url: "http://localhost:3000"
  },
  foo: {
    title: "Bar is awesome"
  }
};
