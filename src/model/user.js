const connection = require("../config/mysql");

module.exports = {
  registerUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertId,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  getUserByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_id = ? ",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  searchUserEmailModel: (input) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_email = ?",
        input,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  searchUserNumberModel: (input) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_number = ?",
        input,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  editUserModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  deleteUserModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM user WHERE user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              user_id: id,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  cekEmailModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_id, user_name, user_email, user_password, user_status FROM user WHERE user_email = ? ",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
