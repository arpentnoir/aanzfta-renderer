import {
  TemplateRegistry,
  TemplateWithComponent
} from '@govtechsg/decentralized-renderer-react-components';

import { templates as AANZFTACoO } from './AANZFTACertificateOfOrigin';
import { templates as AANZFTACoOPartial } from './AANZFTAPartialCoO';
import { AANZFTACertificateOfOriginDoc } from './AANZFTACertificateOfOrigin/AANZFTACertificateOfOrigin';
import { AANZFTAPartialCoOProps } from './AANZFTAPartialCoO/AANZFTAPartialCoO';

type MultipleTemplates = AANZFTACertificateOfOriginDoc | AANZFTAPartialCoOProps;
type MultipleTemplatesWithComponents = TemplateWithComponent<
  MultipleTemplates
>[];

export const registry: TemplateRegistry<MultipleTemplates> = {
  AANZFTACoO: AANZFTACoO as MultipleTemplatesWithComponents,
  AANZFTACoOPartial: AANZFTACoOPartial as MultipleTemplatesWithComponents
};
