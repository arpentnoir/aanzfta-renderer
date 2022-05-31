import { TemplateRegistry } from "@govtechsg/decentralized-renderer-react-components";
import { v3 } from "@govtechsg/open-attestation";

import { templates as certificateOfOriginTemplate } from "./CertificateOfOriginTemplate";

export const registry: TemplateRegistry<v3.OpenAttestationDocument> = {
  COO: certificateOfOriginTemplate
};
