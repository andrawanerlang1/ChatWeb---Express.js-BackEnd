const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../helper/response");
const fs = require("fs");

const {
  registerUserModel,
  cekEmailModel,
  getUserByIdModel,
  searchUserEmailModel,
  searchUserNumberModel,
  editUserModel,
  deleteUserModel,
} = require("../model/user");

module.exports = {
  getUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getUserByIdModel(id);
      if (result.length > 0) {
        return helper.response(response, 200, "Success Get User By Id", result);
      } else {
        return helper.response(response, 404, `User By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  searchUser: async (request, response) => {
    try {
      const { email, number } = request.query;
      if (email) {
        const result = await searchUserEmailModel(email);
        if (result.length > 0) {
          return helper.response(response, 200, "Success Get User", result);
        } else {
          return helper.response(response, 404, `User Not Found`);
        }
      } else if (number) {
        result = await searchUserNumberModel(number);
        if (result.length > 0) {
          return helper.response(response, 200, "Success Get User", result);
        } else {
          return helper.response(response, 404, `User Not Found`);
        }
      } else {
        return helper.response(response, 401, "No input", error);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  registerUser: async (request, response) => {
    const { user_name, user_email, user_password } = request.body;
    const checkDataUser = await cekEmailModel(user_email);
    if (checkDataUser.length > 0) {
      return helper.response(response, 400, "Email already registered");
    } else {
      try {
        const salt = bcrypt.genSaltSync(10);
        const encryptPassword = bcrypt.hashSync(user_password, salt);
        const setData = {
          user_name,
          user_email,
          user_password: encryptPassword,
          user_created_at: new Date(),
        };
        const result = await registerUserModel(setData);
        return helper.response(response, 200, "Success Register User", result);
      } catch (error) {
        return helper.response(response, 400, "Bad Request", error);
      }
    }
  },
  editUser: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        user_name,
        user_email,
        user_number,
        user_bio,
        user_lat,
        user_lng,
      } = request.body;
      if (user_lat && user_lng) {
        const setData = {
          user_lat,
          user_lng,
        };
        const checkId = await getUserByIdModel(id);
        if (checkId.length > 0) {
          const result = await editUserModel(setData, id);
          return helper.response(response, 200, "Success edit user", result);
        } else {
          return helper.response(
            response,
            404,
            `User with id : ${id} is not found`
          );
        }
      } else {
        const setData = {
          user_name,
          user_email,
          user_number,
          user_bio,
          user_updated_at: new Date(),
        };
        const checkId = await getUserByIdModel(id);
        if (checkId.length > 0) {
          const result = await editUserModel(setData, id);
          return helper.response(response, 200, "Success edit user", result);
        } else {
          return helper.response(
            response,
            404,
            `User with id : ${id} is not found`
          );
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  editImage: async (request, response) => {
    try {
      const { id } = request.params;
      const setData = {
        user_image: request.file === undefined ? "" : request.file.filename,
        user_updated_at: new Date(),
      };
      const checkId = await getUserByIdModel(id);
      if (checkId.length > 0) {
        const image = checkId[0].user_image;
        if (setData.user_image) {
          await fs.unlink(`./uploads/user/${image}`, (err) => {
            if (!err) {
              console.log(
                `successfully updated ${image} with ${setData.user_image}`
              );
            } else {
              console.log("Image that would be deleted does not exist");
            }
          });
        } else {
          setData.user_image = image;
        }
        const result = await editUserModel(setData, id);
        return helper.response(response, 200, "Succeed Updating User", result);
      } else {
        return helper.response(
          response,
          404,
          `User with id : ${id} is not found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  editPassword: async (request, response) => {
    try {
      const { id } = request.params;
      const { user_password } = request.body;
      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(user_password, salt);
      const setData = {
        user_password: encryptPassword,
        user_updated_at: new Date(),
      };
      const checkId = await getUserByIdModel(id);
      if (checkId.length > 0) {
        const result = await editUserModel(setData, id);
        return helper.response(
          response,
          200,
          "Success edit user Password",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `User with id : ${id} is not found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteUser: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await getUserByIdModel(id);

      if (checkId.length > 0) {
        const result = await deleteUserModel(id);
        return helper.response(
          response,
          200,
          `Succeed Deleting the User by id ${id}, username: ${checkId[0].user_name}`,
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `User with id : ${id} is not found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      const checkDataUser = await cekEmailModel(user_email);
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          const {
            user_id,
            user_name,
            user_email,
            user_role,
            status,
          } = checkDataUser[0];
          const payload = {
            user_id,
            user_name,
            user_email,
            user_role,
            status,
          };
          const token = jwt.sign(payload, "RAHASIA", { expiresIn: "3h" });
          const result = { ...payload, token };
          return helper.response(response, 200, "Success Login!", result);
        } else {
          return helper.response(response, 400, "Wrong Password!");
        }
      } else {
        return helper.response(
          response,
          400,
          "Email / Account not Registered !"
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
