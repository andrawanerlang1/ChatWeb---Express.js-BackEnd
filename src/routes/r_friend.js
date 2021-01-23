const router = require("express").Router();
const { authorization } = require("../middleware/auth");

const { addFriend, getFriendRequest } = require("../controller/c_friend");

router.get("/friendRequest/:id", authorization, getFriendRequest);
router.post("/invite", authorization, addFriend);

module.exports = router;
