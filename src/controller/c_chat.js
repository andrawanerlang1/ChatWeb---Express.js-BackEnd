// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const helper = require("../helper/response");
// const fs = require("fs");

const { createRoomModel, checkRoomModel } = require("../model/chat");

module.exports = {
  createRoom: async (request, response) => {
    const { user_a, user_b } = request.body;
    const checkRoom = await checkRoomModel(user_a, user_b);
    if (checkRoom.length > 0) {
      return helper.response(response, 400, "Chat-room Already exist");
    } else {
      const a = user_a;
      const b = user_b;
      const room_id = Math.floor(Math.random() * 1000000 + 1);
      const setData1 = { user_a: a, user_b: b, room_id };
      const setData2 = { user_a: b, user_b: a, room_id };
      try {
        const result1 = await createRoomModel(setData1);
        const result2 = await createRoomModel(setData2);
        return helper.response(response, 200, "Room Created", [
          result1,
          result2,
        ]);
      } catch (error) {
        return helper.response(response, 400, "Bad Request", error);
      }
    }
  },
};
