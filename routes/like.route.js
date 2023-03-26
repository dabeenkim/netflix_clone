const express = require("express");
const router = express.Router();

router.patch("/profileIdx", async (req, res) => {
  const { profileIdx } = req.params;
  const user = res.locals.user;
});

module.exports = router;
