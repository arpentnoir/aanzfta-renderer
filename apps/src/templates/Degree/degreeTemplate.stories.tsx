import { degreeSample } from "./sample";

import React from "react";
import { DegreeTemplate } from "./degreeTemplate";

export default {
  title: "templates/Degree",
  component: DegreeTemplate
};

export const DegreeTemplateStory = (): JSX.Element => {
  return <DegreeTemplate document={degreeSample as any} handleObfuscation={() => null} />;
};
