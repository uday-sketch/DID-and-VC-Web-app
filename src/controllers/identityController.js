const identityService = require("../services/identityService");
const { Identity } = require("../models");

exports.createIdentity = async (req, res) => {
  try {
    const identity = await identityService.createIdentity(req.body);
    res.status(201).json(identity);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create identity", error: error.message });
  }
};

exports.getIdentity = async (req, res) => {
  const identity = await identityService.getIdentity(req.params.id);
  if (identity) {
    res.status(200).json(identity);
  } else {
    res.status(404).json({ message: "Identity not found" });
  }
};

exports.getDIDDocument = async (req, res) => {
  try {
    const didDocument = await identityService.getDIDDocument(req.params.id);
    if (didDocument) {
      res.status(200).json(didDocument);
    } else {
      res.status(404).json({ message: "DID Document not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get DID Document", error: error.message });
  }
};

exports.updateIdentity = async (req, res) => {
  const updatedIdentity = await identityService.updateIdentity(
    req.params.id,
    req.body
  );
  if (updatedIdentity) {
    res.status(200).json(updatedIdentity);
  } else {
    res.status(404).json({ message: "Identity not found" });
  }
};

exports.deleteIdentity = async (req, res) => {
  const deleted = await identityService.deleteIdentity(req.params.id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Identity not found" });
  }
};

exports.issueCredential = async (req, res) => {
  try {
    const credential = await identityService.issueCredential(req.body);
    res.status(201).json(credential);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to issue credential", error: error.message });
  }
};

exports.verifyCredential = async (req, res) => {
  try {
    const result = await identityService.verifyCredential(req.body);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to verify credential", error: error.message });
  }
};