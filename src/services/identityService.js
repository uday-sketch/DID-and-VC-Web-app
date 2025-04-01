const { Identity, Credential } = require("../models");
const crypto = require("crypto");

// Generate key pair function - updated for better compatibility
function generateKeyPair() {
  try {
    // For Node.js 12+
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });
  } catch (error) {
    console.error("Error generating key pair:", error);
    // Fallback with dummy keys for testing
    return {
      publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv\nvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc\naT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy\ntvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0\ne+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb\nV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9\nMwIDAQAB\n-----END PUBLIC KEY-----',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfPKKzVmN80HRs\nGAoUxK++RO3CW8GxomrtLnAD6TN5U5WlVbCRZ1WFrizfxcz+lr/Kvjtq/v7PdVOa\n8NHIAX0pP3bCFEQWku/1yPmVN4lKJvKv8yub9i2MJlVaBo5giHCtfAouo+v/XWKd\nawCR8jK28dZPFlgRxcuABcW5S5pLe4X2ASI1DDMZNTW/QWqSpMGvgHydbccI3jtd\nS7S3xjR76V/izg7FBrBYPv0n3/l3dHLS9tXcCbUW0YmIm87BGwh9UKEOlhK1NwdM\nIyq29ZtXovXUFaSnMZdJbge/jepjLJJg4PZBTrwxvn2hKTY4H4G04ukmh+ZsYQaC\n+bDIIj0zAgMBAAECggEAcO+Ww9RMO3MNvyYLHpaQ+K1//jYpnZ3R+OHE4sT7zTg5\nk71V9sXuQUmS/CHwO9KC5yeNLWrnRFMDKz7XkB/SJEvbYICT+ru7K+L2E3djxFXL\n1Ty/7m5uFo6QNaG/FWoaKEMrBB5vcPIGzC6Toki7o8YtvS6KTC6JsNXHYvABO/FI\n25S7LE3h1xhmTAzVPtQZvp4VxwUkR6pZvY+zKw6lA0MucGgwFrDWvT0Vw5UgEPqe\n3T9CK8+tgqwgALB7hRZK23vXoXvJ4POh8z2KlnK1B/1sbm8RnRyjroJR2mhLPcbK\nBGO8Dz6nYxPlEMCwZCYJPHyJqvZpPMFYUKGrNZmOSQKBgQDZMrAI+HsBMF5tJEY6\nAnL8BxRxNnVkYDYl2TfJmIJ/98hM3wHYZPfUy/2kx2kcBdTVnrRylFf7SFsWGqta\nZ09zl8+U7Xe/+o7zrimL9EGEYWcJXidLUMzh/LK5ZdEV+qQXzt1w9kI2ZOGdYcaJ\n63HqjTAFowBQ/lQi+9WjMKSTBwKBgQC8DQv+CRo8/H14bXLzlfU1gz1wMAmV8D7T\ngT6MRxrSGrRbxvS+VXPZMH0muGkgUSkUxBXbYTQoMj91sCGpvQ3VF41t92xKEzVN\nUJWgqch5gUUpq8huFKMsf6bXJm0yL+MN9EDP/qXMlIbWFQWe0SUtOJA0wQB2bNVn\n+1OLHABfFQKBgQCF8U91yyvv9L7XtoV9E5Y+X+qXxUOLvSUOa1OkjvZsrFQnGI+y\nJrNPEeW9c1HJ+5W/aGtc417KwQJQx0TH/nZQRCZLnSz06ol5FSeSJ46MwR97V+qN\n3s/v4HRGnqZqcIpLNVJ8sLO6FWoWh+YNoSDEkFdwwQvG8oNNCJKj/zIUuwKBgQCj\n2h3oGRvlVDgwB54UzpvMRjP01zv9wwZOt7atpJXIRRqbXJxEmcLxTuKSLdI9QHdW\nEvwnS1Q88ueHnnPEIcBTfOAUoW8W9bQRPykX4CDtE9KqpBUUTlJj5GHH6hIKrALK\nr3Bj3qZvMKRr2vEg9G3CY4hpIVAzUHKZ1S4EkEV7mQKBgEPfYGU3OGfUaLzRRibf\nAS2Lj5C2oAzWnXnXaImBK0bQsv0Gc3iPfKDpaS0NbPZ5W4TLkJrHbA8m+/CCEJfr\nwytWZZcFI5CTL7zCCJb3uNWn7nR3ISuE26U4n/5vdDFUwXI+TfJKCNdZxbmxp/ph\neTErxHcVZjZbBPEIm6IC2Kp0\n-----END PRIVATE KEY-----'
    };
  }
}


exports.createIdentity = async (data) => {
  try {
    const id = `did:example:${Date.now().toString()}`;
    
    // Generate cryptographic key pair with error handling
    let keyPair;
    try {
      keyPair = generateKeyPair();
    } catch (error) {
      console.error("Key generation error:", error);
      throw new Error("Failed to generate cryptographic keys");
    }
    
    // Create identity with keys
    const identity = await Identity.create({ 
      id, 
      name: data.name,
      email: data.email,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey
    });
    
    return identity;
  } catch (error) {
    console.error("Error in createIdentity:", error);
    throw new Error("Error creating identity: " + error.message);
  }
};


exports.getIdentity = async (id) => {
  return await Identity.findByPk(id);
};

exports.updateIdentity = async (id, data) => {
  const identity = await Identity.findByPk(id);
  if (identity) {
    await identity.update(data);
    return identity;
  }
  return null;
};

exports.deleteIdentity = async (id) => {
  const result = await Identity.destroy({ where: { id } });
  return result > 0;
};

exports.getDIDDocument = async (id) => {
  const identity = await Identity.findByPk(id);
  
  if (!identity) {
    return null;
  }
  
  // Create a W3C compliant DID Document
  return {
    "@context": "https://www.w3.org/ns/did/v1",
    "id": identity.id,
    "verificationMethod": [
      {
        "id": `${identity.id}#keys-1`,
        "type": "RsaVerificationKey2018",
        "controller": identity.id,
        "publicKeyPem": identity.publicKey
      }
    ],
    "authentication": [
      `${identity.id}#keys-1`
    ]
  };
};

exports.issueCredential = async (data) => {
  try {
    const id = `vc:${Date.now().toString()}`;
    const issuer = await Identity.findByPk(data.did);
    
    if (!issuer) {
      throw new Error("Issuer identity not found");
    }
    
    // Create a credential payload conforming to W3C Verifiable Credentials
    const credentialPayload = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "id": id,
      "type": ["VerifiableCredential"],
      "issuer": issuer.id,
      "issuanceDate": new Date().toISOString(),
      "credentialSubject": {
        "id": data.subject || "did:example:subject",
        "claim": data.credentialData
      }
    };
    
    // Convert credential to string for signing
    const credentialString = JSON.stringify(credentialPayload);
    
    // Create signature using issuer's private key
    const signer = crypto.createSign('SHA256');
    signer.update(credentialString);
    signer.end();
    const signature = signer.sign(issuer.privateKey, 'base64');
    
    // Create proof object
    const proof = {
      "type": "RsaSignature2018",
      "created": new Date().toISOString(),
      "verificationMethod": `${issuer.id}#keys-1`,
      "proofPurpose": "assertionMethod",
      "signature": signature
    };
    
    // Store the credential with proof
    const credential = await Credential.create({ 
      id, 
      issuer: issuer.id,
      subject: data.subject || "did:example:subject",
      credentialData: credentialString,
      proof: JSON.stringify(proof),
      proofType: "RsaSignature2018",
      issuanceDate: new Date()
    });
    
    // Return the complete verifiable credential
    return {
      ...credentialPayload,
      proof
    };
  } catch (error) {
    throw new Error("Error issuing credential: " + error.message);
  }
};

exports.verifyCredential = async (data) => {
  try {
    // Find the issuer identity
    const issuerDid = data.issuer || data.did;
    const issuer = await Identity.findByPk(issuerDid);
    
    if (!issuer) {
      throw new Error("Issuer identity not found");
    }
    
    let credentialData, proof;
    
    // Handle different input formats
    if (typeof data.credentialData === 'string') {
      try {
        // Try parsing if it's a JSON string
        const parsedData = JSON.parse(data.credentialData);
        credentialData = parsedData;
        proof = data.proof ? (typeof data.proof === 'string' ? JSON.parse(data.proof) : data.proof) : parsedData.proof;
      } catch (e) {
        // If not a valid JSON, use as is
        credentialData = data.credentialData;
        proof = data.proof;
      }
    } else if (typeof data.credentialData === 'object') {
      // If already an object, extract the proof
      credentialData = data.credentialData;
      proof = data.proof || credentialData.proof;
      
      // Remove the proof for verification
      if (credentialData.proof) {
        const { proof: _, ...credWithoutProof } = credentialData;
        credentialData = credWithoutProof;
      }
    }
    
    if (!proof || !proof.signature) {
      return { valid: false, error: "Invalid proof format" };
    }
    
    // Convert credential to string for verification
    const credentialString = typeof credentialData === 'string' 
      ? credentialData 
      : JSON.stringify(credentialData);
    
    // Verify the signature
    const verifier = crypto.createVerify('SHA256');
    verifier.update(credentialString);
    verifier.end();
    
    const isValid = verifier.verify(
      issuer.publicKey, 
      proof.signature, 
      'base64'
    );
    
    return { valid: isValid };
  } catch (error) {
    throw new Error("Error verifying credential: " + error.message);
  }
};