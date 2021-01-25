const router = require("express").Router();
const { authorization } = require("../middleware/auth");

const {
  addFriend,
  getFriendRequest,
  acceptFriendRequest,
  getFriends,
  deleteFriend,
} = require("../controller/c_friend");

router.get("/friendRequest/:id", authorization, getFriendRequest);
router.get("/friendList/:id", authorization, getFriends);
router.post("/invite", authorization, addFriend);
router.patch("/accept", authorization, acceptFriendRequest);
router.delete("/delete", authorization, deleteFriend);

module.exports = router;
