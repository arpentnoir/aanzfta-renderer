import { TemplateRegistry } from "@govtechsg/decentralized-renderer-react-components";
import { templates as certificateOfOriginTemplate } from "./CertificateOfOriginTemplate";
import { templates as customTemplate } from "./customTemplate";
import { CustomTemplateCertificate } from "./samples";

export const registry: TemplateRegistry<CustomTemplateCertificate> = {
  custom: customTemplate,
  coo: certificateOfOriginTemplate
};
