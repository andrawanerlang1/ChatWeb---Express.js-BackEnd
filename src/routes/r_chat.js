const router = require("express").Router();
const { authorization } = require("../middleware/auth");

const {
  createRoom,
  getRoom,
  sendMessage,
  getMessage,
} = require("../controller/c_chat");

router.get("/room/:id", authorization, getRoom);
router.post("/room", authorization, createRoom);
router.post("/message", authorization, sendMessage);
router.get("/message/:id", authorization, getMessage);

module.exports = router;
