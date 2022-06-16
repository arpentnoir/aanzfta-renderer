import { render } from "@testing-library/react";
import { EmployeeTemplate } from "./employeeTemplate";
import React from "react";

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
  ]
};

describe("employeeTemplate", () => {
  it("should render correctly", async () => {
    const { findByText, findByTestId } = render(
      <EmployeeTemplate document={document as any} handleObfuscation={jest.fn()} />
    );

    expect(await findByText("Dytallix Mining Company")).toBeInstanceOf(HTMLElement);

    const qualificationLink = await findByTestId("verify-link");
    expect(qualificationLink).toHaveProperty("href", "warp://dytalliz.galatic/storageApi/johndoe");
  });
});
