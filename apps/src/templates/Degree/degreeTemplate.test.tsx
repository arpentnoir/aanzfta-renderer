import React from "react";
import { render } from "@testing-library/react";
import { DegreeTemplate } from "./degreeTemplate";

const document = {
  credentialSubject: {
    recipient: "John Doe",
    degree: "Bachelor of Advanced Interstellar Combat"
  },
  issuer: {
    name: "Starfleet Academy"
  },
  issuers: []
};

describe("degreeTemplate", () => {
  it("should render correctly", async () => {
    const { findByText } = render(<DegreeTemplate document={document as any} handleObfuscation={jest.fn()} />);

    expect(await findByText("Starfleet Academy")).toBeInstanceOf(HTMLElement);
    expect(await findByText("John Doe")).toBeInstanceOf(HTMLElement);
    expect(await findByText("Bachelor of Advanced Interstellar Combat")).toBeInstanceOf(HTMLElement);
  });
});
