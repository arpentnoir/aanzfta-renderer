import {
  TemplateRegistry,
  TemplateWithComponent
} from '@govtechsg/decentralized-renderer-react-components';

import { templates as AANZFTACoO } from './AANZFTACertificateOfOrigin';
import { AANZFTACertificateOfOriginDoc } from './AANZFTACertificateOfOrigin/AANZFTACertificateOfOrigin';
import { templates as AANZFTACoOPartial } from './AANZFTAPartialCoO';
import { AANZFTAPartialCoOProps } from './AANZFTAPartialCoO/AANZFTAPartialCoO';

type MultipleTemplates = AANZFTACertificateOfOriginDoc | AANZFTAPartialCoOProps;
type MultipleTemplatesWithComponents = TemplateWithComponent<
  MultipleTemplates
>[];

export const registry: TemplateRegistry<MultipleTemplates> = {
  'AANZFTA-COO': AANZFTACoO as MultipleTemplatesWithComponents,
  'AANZFTA-COO-Partial': AANZFTACoOPartial as MultipleTemplatesWithComponents
};
