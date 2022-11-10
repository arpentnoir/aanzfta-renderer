import React, { FunctionComponent } from "react";

interface DocumentSummaryProps {
  certificateNo: string;
  title: string | React.ReactNode | React.ReactNodeArray;
  issuedIn: string;
}

export const DocumentSummary: FunctionComponent<DocumentSummaryProps> = ({ certificateNo, title, issuedIn }) => {
  return (
    <div className="border text-center" style={{ flexDirection: "column", display: "flex", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: "0.25em",
          paddingRight: "0.25em"
        }}
      >
        <div>Certificate No.: {certificateNo}</div>
        <div>Form AANZ</div>
      </div>
      <div
        className="p-2"
        style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", flex: 1 }}
      >
        {title}
      </div>
      <div>Issued in: {issuedIn}</div>
    </div>
  );
};
