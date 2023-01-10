import {
  TemplateRegistry,
  TemplateWithComponent
} from '@govtechsg/decentralized-renderer-react-components';
import { templates as AANZFTACoO } from './AANZFTACertificateOfOrigin';
import { AANZFTACertificateOfOriginDoc } from './AANZFTACertificateOfOrigin/AANZFTACertificateOfOrigin';

type MultipleTemplates = AANZFTACertificateOfOriginDoc;
type MultipleTemplatesWithComponents = TemplateWithComponent<
  MultipleTemplates
>[];

export const registry: TemplateRegistry<MultipleTemplates> = {
  AANZFTACoO: AANZFTACoO as MultipleTemplatesWithComponents
};
