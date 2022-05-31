import { render } from "@testing-library/react";
import { EmployeeTemplate } from "./employeeTemplate";
import React from "react";
import { v2 } from "@govtechsg/open-attestation";

const document = {
  credentialSubject: {
    employee: "John Doe"
  },
  issuer: {
    name: "Dytallix Mining Company"
  },
  relatedLink: [
    {
      type: "linkRole",
      target: "warp://dytalliz.galatic/storageApi/johndoe",
      linkRelationship: "degreeLink"
    }
  ],
  issuers: [],
  $template: {} as v2.TemplateObject
};

describe("employeeTemplate", () => {
  it("should render correctly", async () => {
    const { findByText, findByTestId } = render(<EmployeeTemplate document={document} handleObfuscation={jest.fn()} />);

    expect(await findByText("Dytallix Mining Company")).toBeInstanceOf(HTMLElement);

    const qualificationLink = await findByTestId("testing");
    expect(qualificationLink).toHaveProperty("href", "warp://dytalliz.galatic/storageApi/johndoe");
  });
});
