const express = require("express");
const identityController = require("../controllers/identityController");

const router = express.Router();

router.post("/", identityController.createIdentity);
router.get("/:id", identityController.getIdentity);
router.get("/:id/did-document", identityController.getDIDDocument);
router.put("/:id", identityController.updateIdentity);
router.delete("/:id", identityController.deleteIdentity);
router.post("/credentials", identityController.issueCredential);
router.post("/credentials/verify", identityController.verifyCredential);

module.exports = router;