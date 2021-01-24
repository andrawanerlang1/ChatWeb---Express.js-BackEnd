const connection = require("../config/mysql");

module.exports = {
  createRoomModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO room SET ?", setData, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  checkRoomModel: (a, b) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM room WHERE user_a = ? AND user_b = ?",
        [a, b],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },
  getRoomModel: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT room_id, user.user_id, user.user_email, user.user_name , user.user_image FROM room RIGHT JOIN user ON user.user_id = user_b WHERE user_a = ? AND status = 1",
        [user_id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },
};
