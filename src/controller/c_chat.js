// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const helper = require("../helper/response");
// const fs = require("fs");

const {
  createRoomModel,
  checkRoomModel,
  getRoomModel,
  sendMessageModel,
  getMessageModel,
  getLastMessageModel,
} = require("../model/chat");

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
  getRoom: async (request, response) => {
    const { id } = request.params;
    try {
      const result = await getRoomModel(id);
      console.log(result[0].room_id);
      let arrResult = [];
      for (let i = 0; i < result.length; i++) {
        let result2 = await getLastMessageModel(result[i].room_id);
        if (!result2[0]) {
          result2[0] = { message: "", created_at: "" };
        }
        const result3 = {
          ...result[i],
          message: result2[0].message,
          created_at: result2[0].created_at,
        };
        arrResult.push(result3);
      }
      return helper.response(
        response,
        200,
        "Here is your chat room list",
        arrResult
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  sendMessage: async (request, response) => {
    const { room_id, sender, receiver, message } = request.body;
    const setData = {
      room_id,
      sender,
      receiver,
      message,
    };
    try {
      const result = await sendMessageModel(setData);
      return helper.response(response, 200, "Message Sent", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getMessage: async (request, response) => {
    const { id } = request.params;
    try {
      const result = await getMessageModel(id);
      return helper.response(
        response,
        200,
        "Here is your message history",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
