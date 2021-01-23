const connection = require("../config/mysql");

module.exports = {
  addFriendModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO friendlist SET ?",
        setData,
        (error, result) => {
          console.log(result);
          const newResult = {
            ...setData,
          };
          if (!error) {
            resolve(newResult);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },
  cekFriendStatusModel: (a, b) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM friendlist WHERE user_id = ? AND friend_id = ?",
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
  getFriendRequestModel: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user.user_email, user.user_name FROM friendlist RIGHT JOIN user ON user.user_id = friendlist.user_id WHERE friend_id = ? AND status = 0",
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
