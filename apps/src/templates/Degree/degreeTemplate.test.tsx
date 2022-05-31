import React from "react";
import { render } from "@testing-library/react";
import { v2 } from "@govtechsg/open-attestation";
import { DegreeTemplate } from "./degreeTemplate";

const document = {
  credentialSubject: {
    recipient: "John Doe",
    degree: "Bachelor of Advanced Interstellar Combat"
  },
  issuer: {
    name: "Starfleet Academy"
  },
  issuers: [],
  $template: {} as v2.TemplateObject
};

describe("degreeTemplate", () => {
  it("should render correctly", async () => {
    const { findByText } = render(<DegreeTemplate document={document} handleObfuscation={jest.fn()} />);

    expect(await findByText("Starfleet Academy")).toBeInstanceOf(HTMLElement);
    expect(await findByText("Recipient: John Doe")).toBeInstanceOf(HTMLElement);
    expect(await findByText("Degree: Bachelor of Advanced Interstellar Combat")).toBeInstanceOf(HTMLElement);
  });
});
