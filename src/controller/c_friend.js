const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../helper/response");
const fs = require("fs");

const {
  addFriendModel,
  cekFriendStatusModel,
  getFriendRequestModel,
} = require("../model/friend");

module.exports = {
  addFriend: async (request, response) => {
    const { user_id, friend_id } = request.body;
    const checkFriendStatus = await cekFriendStatusModel(user_id, friend_id);
    if (checkFriendStatus.length > 0) {
      console.log(checkFriendStatus[0].status);
      return helper.response(
        response,
        400,
        "Friend request already sent before"
      );
    } else {
      try {
        const setData = {
          user_id,
          friend_id,
          created_at: new Date(),
          status: 0,
        };
        const result = await addFriendModel(setData);
        return helper.response(response, 200, "Friend Invitation Sent", result);
      } catch (error) {
        return helper.response(response, 400, "Bad Request", error);
      }
    }
  },
  getFriendRequest: async (request, response) => {
    const { id } = request.params;
    try {
      const result = await getFriendRequestModel(id);
      return helper.response(
        response,
        200,
        "Here is your friend request",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
