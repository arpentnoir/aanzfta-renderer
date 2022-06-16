export const degreeSample = {
  version: "https://schema.openattestation.com/3.0/schema.json",
  credentialSubject: {
    recipient: "Jim Kirk",
    degree: "Bachelor of Galatic Warfare",
    club: "",
    links: {
      self: {
        href:
          "http://localhost:3000?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Fhslteu5mp9.execute-api.ap-southeast-2.amazonaws.com%2Fha-dvp-dev-storage-api%2Ffc50a168-382f-45f3-a22a-bdc3fde28dd6%22%2C%22key%22%3A%222834e2d088019c22f444a59cbe10f255ce4ee1ec5f255e26814d929a1d183ced%22%2C%22permittedActions%22%3A%5B%22STORE%22%5D%2C%22redirect%22%3A%22http%3A%2F%2Flocalhost%3A3000%2F%22%7D%7D"
      }
    }
  },
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "http://localhost:7000/contexts/Degree.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json"
  ],
  type: ["VerifiableCredential", "OpenAttestationCredential"],
  issuanceDate: "2010-01-01T19:23:24Z",
  openAttestationMetadata: {
    template: {
      type: "EMBEDDED_RENDERER",
      name: "Degree",
      url: "http://localhost:7000"
    },
    proof: {
      type: "OpenAttestationProofMethod",
      method: "DID",
      value: "did:ethr:0x85a3dc45a8a3fc745afc2eb04ce77583c54965c3",
      revocation: {
        type: "NONE"
      }
    },
    identityProof: {
      type: "DNS-DID",
      identifier: "keen-coffee-dog.sandbox.fyntech.io"
    }
  },
  issuer: {
    id: "https://example.com",
    name: "Starfleet Academy",
    type: "OpenAttestationIssuer"
  },
  network: {
    chain: "ETH",
    chainId: "1"
  },
  proof: {
    type: "OpenAttestationMerkleProofSignature2018",
    proofPurpose: "assertionMethod",
    targetHash: "1313dc6e337c2eaab6987f9d8e3ecb973de32c066ee352bc2074adce965517c0",
    proofs: [],
    merkleRoot: "1313dc6e337c2eaab6987f9d8e3ecb973de32c066ee352bc2074adce965517c0",
    salts:
      "W3sidmFsdWUiOiI4Y2QzYzc5NDZmMTVjZTA2NDhkNGQ2ZDYwMTViMGRjZWU3MDExOWFiNmUwZjg5NmU2YTI1NDljZWNiYTZmNTk1IiwicGF0aCI6InZlcnNpb24ifSx7InZhbHVlIjoiZmI0NTdkYjYzOTI4OGFlNzUyZDAxYWY0ZmJiMjQwMWU4YjY5ZDA2OTY3MDdiMGNlZGFkZGU2YjZjOGZmNjVlMCIsInBhdGgiOiJjcmVkZW50aWFsU3ViamVjdC5yZWNpcGllbnQifSx7InZhbHVlIjoiYTExNTgzNmNiZjNiNmRjZGQxY2E1NGI4OTk4OTEzZDY0YTk5ODI0ODNmMjEwYWM4NTRiMWVmYjhkNmY0NGE4MSIsInBhdGgiOiJjcmVkZW50aWFsU3ViamVjdC5kZWdyZWUifSx7InZhbHVlIjoiMzA3ZTI1YzJlNjc5OGU0OTBjOTZiY2E5ZWRhYjBjZjU2MzI5N2VmMTRiNjIwMTZlOTIwNGNmZGFhNWNjMTU4YyIsInBhdGgiOiJjcmVkZW50aWFsU3ViamVjdC5saW5rcy5zZWxmLmhyZWYifSx7InZhbHVlIjoiZWYzMDNhZjQ4Y2NiMjk5NWFmMzVhMjhiNTI4NWIxOTRhNmQxYTQ3ZTNhM2U5OWU3YmJjNjkzZWJmNjA2Y2FjNyIsInBhdGgiOiJAY29udGV4dFswXSJ9LHsidmFsdWUiOiIyYzBjZDI1MjkwZmQzODNmNDk4ZGIyYzFjMDM3YjY3NTdjMzVlYTFiMDdmMTQ5NzUzY2MzNzdhNjdmYjI3ZmQ2IiwicGF0aCI6IkBjb250ZXh0WzFdIn0seyJ2YWx1ZSI6IjVlZjVjZDY0ZjkwM2Y2NzFjZGMzMTVkM2RlMDMyOWQyNWQ2MmQwMTgxOGMwMGQwMmY0M2I1NjI4Njk0MjNiNzQiLCJwYXRoIjoiQGNvbnRleHRbMl0ifSx7InZhbHVlIjoiOWIwNzA0MDNiOTMxODBmMDFiNjk2M2Q4YzNhNzI5NmQ5MjA3MzU1NWRkYzk3ZTMyZWJhYzQ4M2QxZWQ0ZGM4NiIsInBhdGgiOiJ0eXBlWzBdIn0seyJ2YWx1ZSI6IjU3NzVhOGI5Y2FkMmQ4OTZkMmE2OTlhMDY5ZWRkMDRjZTkyZTAwMTU0NTI1OGM4Yjc0YWRjZDkyOGVkZGEzNWQiLCJwYXRoIjoidHlwZVsxXSJ9LHsidmFsdWUiOiI4ZGM1MTUzY2E1OGI3ZTYxYWI4YjA1ZDAwYjFlYTdjNDBlNGEyMWE3ODFlNTY2MTZjZWM4YmZlMTRiNjc2NWQ3IiwicGF0aCI6Imlzc3VhbmNlRGF0ZSJ9LHsidmFsdWUiOiJiZDc1ODNmMWI4NWViNmZjMWRkOTMwMWE1ZDVjYWExY2E0MGNjOTllNDYwZDRhYjUxZWJiYjVhMjg0MjcxYmMwIiwicGF0aCI6Im9wZW5BdHRlc3RhdGlvbk1ldGFkYXRhLnRlbXBsYXRlLnR5cGUifSx7InZhbHVlIjoiZmVkM2MwZGY2OWJjMTFlNTY0YTAyYjk2ZWQ2MWZmOWQ3NmVlMGExOGM2ODdlZjIxZWVjY2MzZTNiNDYwZjBjMSIsInBhdGgiOiJvcGVuQXR0ZXN0YXRpb25NZXRhZGF0YS50ZW1wbGF0ZS5uYW1lIn0seyJ2YWx1ZSI6IjkwMjg2ZDk2Y2NmZmZiMDgyNzYyMjYzMjdhOTkzMGEyNjIwNzQwMzdjZmQ3ZjcyYzMwZjNkMGU4NDUxMTEwMTAiLCJwYXRoIjoib3BlbkF0dGVzdGF0aW9uTWV0YWRhdGEudGVtcGxhdGUudXJsIn0seyJ2YWx1ZSI6IjA5YzdmZDQ4NTg2OGI3ZGI4YTAxZTFmOTA1OTk2YmQ2MTM4YzFjMDQwMWIxMjQyMzM1NTlhOTE2YjQ0MDYzMTYiLCJwYXRoIjoib3BlbkF0dGVzdGF0aW9uTWV0YWRhdGEucHJvb2YudHlwZSJ9LHsidmFsdWUiOiIwMDEwOWRkYWZhMTJkMjA4NjUyYTRiYTQ3NzVjZWQ0YzMyZDk5MzMyNGIzMjViYmIzNTllZmI1ZjY4OWExMDAwIiwicGF0aCI6Im9wZW5BdHRlc3RhdGlvbk1ldGFkYXRhLnByb29mLm1ldGhvZCJ9LHsidmFsdWUiOiJiMWZmNzBmZDljNDZmOTEzOTViNTFhZGQ1MzNlMTQ2MzVmNzgxOGNkMDUwMmUwNDE3YTk5OTgwMDE5ZmIyYmExIiwicGF0aCI6Im9wZW5BdHRlc3RhdGlvbk1ldGFkYXRhLnByb29mLnZhbHVlIn0seyJ2YWx1ZSI6ImU2ZTRhNjZmNTYzYmUxMzc3ODM4ZGEzNjI0MzhlYzg1ZDg1YzYxNzg0ODg0NTNmZWJjNTY1NTQwOTZlNGM0OTciLCJwYXRoIjoib3BlbkF0dGVzdGF0aW9uTWV0YWRhdGEucHJvb2YucmV2b2NhdGlvbi50eXBlIn0seyJ2YWx1ZSI6ImQ2NTliNjFjZmVjNjc4M2IwYjI2NGUzOTZlZjZjNjAzNTZmNjI5NTVmNzM4NzJjNTUxNzU2ZGIxMWUyN2I4NjkiLCJwYXRoIjoib3BlbkF0dGVzdGF0aW9uTWV0YWRhdGEuaWRlbnRpdHlQcm9vZi50eXBlIn0seyJ2YWx1ZSI6ImY4OWZmZTE1YWZkODZiN2IxM2JjZDAyMjY5ZDNlZTE0NmIxNzEzNjRiOTNlZjczYWE5NzA5OWMzNmVkNGM0YTMiLCJwYXRoIjoib3BlbkF0dGVzdGF0aW9uTWV0YWRhdGEuaWRlbnRpdHlQcm9vZi5pZGVudGlmaWVyIn0seyJ2YWx1ZSI6IjJiNGMzOGFmOTRlZTU3MTNiNzBjODNmNjgxOTY4YzcwYmFmMjA1OGFjMGFmNjRiOGJkNzU1ZWFkOTIzZWJmMTQiLCJwYXRoIjoiaXNzdWVyLmlkIn0seyJ2YWx1ZSI6ImFhNWQ3MGFjZThhNDA3YTZjNjNjM2NlZTlmYzYzNjMxODgzNjEyNTU3ODc0ZThjZjNhNTVkMTlmNzk4ODIyMmUiLCJwYXRoIjoiaXNzdWVyLm5hbWUifSx7InZhbHVlIjoiYTAzOGYyMWEwZDEwMDIzZmJlZWRlMDdhNDVkYjhkZTAzOGE5Y2Q5Y2ZmNzU5MWE4ZTI2ZDY0NzBjNjJiODhjNiIsInBhdGgiOiJpc3N1ZXIudHlwZSJ9LHsidmFsdWUiOiI5MDBmOGNlMTg0Yjg5OWRjNjZjNDU0NTZmZmE4Mjg5NmYwZWE3MjYwODVkNjJlZmJhOGUxMzYzZGNkNDA5YWI5IiwicGF0aCI6Im5ldHdvcmsuY2hhaW4ifSx7InZhbHVlIjoiNDMwODRiMjZiOWQ5MDk5MGI0YzAwYzNlYTkwMDdhODEyMDJhOGE4MTIxN2U3OWYzNGJlNThhOTgyN2ZjMjMzMCIsInBhdGgiOiJuZXR3b3JrLmNoYWluSWQifV0=",
    privacy: {
      obfuscated: []
    },
    key: "did:ethr:0x85A3dc45A8A3fc745Afc2eB04CE77583c54965C3#controller",
    signature:
      "0x39fbbe328fe69d1b98f6d65dfff59d2582ca769390d06daf20827ddf6ad9d4624bcf7c8a10de02d2577783bd06c676b8911d51b941bb93fcf7d2486db59cee8a1b"
  }
};
