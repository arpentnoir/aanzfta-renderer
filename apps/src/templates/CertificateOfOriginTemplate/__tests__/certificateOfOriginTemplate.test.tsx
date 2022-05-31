import { CertificateOfOriginTemplate } from "../CertificateOfOriginTemplate";
import { certificateOfOriginSample } from "../../samples";
import { render } from "@testing-library/react";
import React from "react";

describe("certificateOfOriginTemplate", () => {
  it("should render with title provided by the document", () => {
    const { queryByText } = render(
      <CertificateOfOriginTemplate document={certificateOfOriginSample} handleObfuscation={() => void 0} />
    );
    // eslint-disable-next-line jest/no-truthy-falsy
    expect(queryByText("Certificate of Origin")).toBeTruthy();
  });

  it("react-pdf component renders, but PDF yet to load", () => {
    const { queryByText } = render(
      <CertificateOfOriginTemplate document={{ ...certificateOfOriginSample }} handleObfuscation={() => void 0} />
    );

    // eslint-disable-next-line jest/no-truthy-falsy
    expect(queryByText("No PDF file specified.")).toBeTruthy();
  });
});
