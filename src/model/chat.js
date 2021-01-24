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
};
