import ReactDOM from "react-dom";
import { customTemplateCertificate } from "../src/templates/samples";
import { certificateOfOriginSample } from "../src/templates/samples";
import React from "react";
import { App } from "./app";

ReactDOM.render(
  <App
    documents={[
      { name: "Default document", document: customTemplateCertificate },
      { name: "COO document", document: certificateOfOriginSample },
      {
        name: "Red document",
        document: {
          ...customTemplateCertificate,
          foo: "bar",
          $template: {
            ...customTemplateCertificate.$template,
            name: "red"
          }
        }
      }
    ]}
  />,
  document.getElementById("root")
);
