const router = require("express").Router();
const { authorization } = require("../middleware/auth");

const { createRoom, getRoom } = require("../controller/c_chat");

router.get("/room/:id", authorization, getRoom);
router.post("/room", authorization, createRoom);

module.exports = router;
