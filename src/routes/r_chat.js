const router = require("express").Router();
const { authorization } = require("../middleware/auth");

const { createRoom } = require("../controller/c_chat");

router.post("/room", authorization, createRoom);

module.exports = router;
