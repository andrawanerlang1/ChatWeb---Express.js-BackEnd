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
  acceptFriendModel: (user_id, friend_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE friendlist SET status = 1 WHERE user_id = ${user_id} AND friend_id = ${friend_id}`,
        (error, result) => {
          console.log(result);
          const newResult = {
            user_id,
            friend_id,
            status: 1,
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
  deleteFriendModel: (user_id, friend_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE from friendlist WHERE user_id = ${user_id} AND friend_id = ${friend_id}`,
        (error, result) => {
          console.log(result);
          const newResult = {
            user_id,
            friend_id
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
        "SELECT user.user_id, user.user_email, user.user_name , user.user_image FROM friendlist RIGHT JOIN user ON user.user_id = friendlist.user_id WHERE friend_id = ? AND status = 0",
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
  getFriendModel: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user.user_id, user.user_email, user.user_name, user.user_image FROM friendlist RIGHT JOIN user ON user.user_id = friendlist.friend_id WHERE friendlist.user_id = ? AND status = 1",
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
