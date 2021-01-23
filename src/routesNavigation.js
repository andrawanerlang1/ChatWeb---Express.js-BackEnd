const router = require("express").Router();
const user = require("./routes/r_user");
const friend = require("./routes/r_friend");

router.use("/user", user);
router.use("/friend", friend);
module.exports = router;
