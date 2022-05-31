import { v3 } from "@govtechsg/open-attestation";

export interface CertificateOfOrigin extends v3.OpenAttestationDocument {
  credentialSubject: {
    supplyChainConsignment?: {
      documentAttachment: { documentAttachment: string };
    };
  };
}

export const certificateOfOriginSample: CertificateOfOrigin = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schemata.openattestation.com/io/tradetrust/certificate-of-origin/1.0/certificate-of-origin-context.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json"
  ],
  type: ["VerifiableCredential", "OpenAttestationCredential"],
  issuanceDate: "2010-01-01T19:23:24Z",

  openAttestationMetadata: {
    template: {
      type: v3.TemplateType.EmbeddedRenderer,
      name: "COO",
      url: "http://localhost:3000"
    },
    proof: {
      type: v3.ProofType.OpenAttestationProofMethod,
      method: v3.Method.Did,
      value: "did:ethr:0x1245e5b64d785b25057f7438f715f4aa5d965733",
      revocation: {
        type: v3.RevocationType.None
      }
    },
    identityProof: {
      type: v3.IdentityProofType.DNSDid,
      identifier: "demo-tradetrust.openattestation.com"
    }
  },
  credentialSubject: {
    supplyChainConsignment: {
      documentAttachment: { documentAttachment: "" }
    }
  },
  issuer: {
    id: "https://example.com",
    name: "DEMO DID"
  }
};
