const router = require("express").Router();
const { authorization } = require("../middleware/auth");

const {
  addFriend,
  getFriendRequest,
  acceptFriendRequest,
  getFriends,
} = require("../controller/c_friend");

router.get("/friendRequest/:id", authorization, getFriendRequest);
router.get("/friendList/:id", authorization, getFriends);
router.post("/invite", authorization, addFriend);
router.patch("/accept", authorization, acceptFriendRequest);

module.exports = router;
