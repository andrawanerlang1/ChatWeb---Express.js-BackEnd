const router = require("express").Router();
const user = require("./routes/r_user");
const friend = require("./routes/r_friend");
const Chat = require("./routes/r_chat");

router.use("/user", user);
router.use("/friend", friend);
router.use("/chat", Chat);
module.exports = router;
