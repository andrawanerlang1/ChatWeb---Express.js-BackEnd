const router = require("express").Router();
const { authorization, isAdmin } = require("../middleware/auth");
const uploadImage = require("../middleware/multer");

const {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  editImage,
  editPassword,
  getUserById,
  searchUser,
} = require("../controller/c_user");

router.get("/byId/:id", authorization, getUserById);
router.get("/search", authorization, searchUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/edit/:id", authorization, editUser);
router.patch("/image/:id", authorization, uploadImage, editImage);
router.patch("/password/:id", authorization, editPassword);
router.delete("/:id", authorization, isAdmin, deleteUser);

module.exports = router;
