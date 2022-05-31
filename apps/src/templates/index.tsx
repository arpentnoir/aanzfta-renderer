import { TemplateRegistry, TemplateWithComponent } from "@govtechsg/decentralized-renderer-react-components";
import { templates as degreeTemplate } from "./Degree";
import { DegreeTemplateCertificate } from "./Degree/degreeTemplate";
import { templates as employeeTemplate } from "./Employee";
import { EmployeeTemplateCertificate } from "./Employee/employeeTemplate";

type MultipleTemplates = EmployeeTemplateCertificate | DegreeTemplateCertificate;
type MultipleTemplatesWithComponents = TemplateWithComponent<MultipleTemplates>[];

export const registry: TemplateRegistry<MultipleTemplates> = {
  Employee: employeeTemplate as MultipleTemplatesWithComponents,
  Degree: degreeTemplate as MultipleTemplatesWithComponents
};
