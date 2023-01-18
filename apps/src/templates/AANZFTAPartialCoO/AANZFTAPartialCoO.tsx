import React, { FunctionComponent, useState } from 'react';
import { TemplateProps } from '@govtechsg/decentralized-renderer-react-components';
import { v3 } from '@govtechsg/open-attestation';
import { Document, Page } from 'react-pdf';

export interface AANZFTAPartialCoOProps extends v3.OpenAttestationDocument {
  credentialSubject: {
    originalDocument: string;
    iD?: string;
    freeTradeAgreement?: string;
    importingJurisdiction?: string;
    exporterOrManufacturerAbn?: string;
    importerName?: string;
    consignmentReferenceNumber?: string;
  };
}

export const AANZFTAPartialCoORender: FunctionComponent<TemplateProps<
  AANZFTAPartialCoOProps
> & {
  className?: string;
}> = ({ document }) => {
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };
  return (
    <div
      data-testid={'pdf-document'}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <div
        className="no-print"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '1em'
        }}
      >
        <h1
          className="no-print"
          style={{
            fontWeight: 700,
            width: '100%',
            fontSize: '1.25rem',
            paddingBottom: '0.5em'
          }}
        >
          Meta-Data:
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <div
            style={{
              display: 'flex',
              paddingRight: '1em',
              flexDirection: 'column'
            }}
          >
            <p>iD: {document?.credentialSubject?.iD}</p>
            <p>
              freeTradeAgreement:{' '}
              {document?.credentialSubject?.freeTradeAgreement}
            </p>
            <p>
              importingJurisdiction:{' '}
              {document?.credentialSubject?.importingJurisdiction}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>
              exporterOrManufacturerAbn:{' '}
              {document?.credentialSubject?.exporterOrManufacturerAbn}
            </p>
            <p>importerName: {document?.credentialSubject?.importerName}</p>
            <p>
              consignmentReferenceNumber:{' '}
              {document?.credentialSubject?.consignmentReferenceNumber}
            </p>
          </div>
        </div>

        <h1
          className="no-print"
          style={{
            fontWeight: 700,
            fontSize: '1.25rem',
            width: '100%',
            paddingBottom: '0.5em',
            paddingTop: '0.5em'
          }}
        >
          PDF:
        </h1>
      </div>
      <div className="AANZFTAContainer">
        {document?.credentialSubject?.originalDocument ? (
          <Document
            file={document.credentialSubject.originalDocument}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                data-testid={'pdf-page'}
              />
            ))}
          </Document>
        ) : (
          <div>Unable to load</div>
        )}
      </div>
    </div>
  );
};
