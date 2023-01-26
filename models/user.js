const mysql = require("mysql");
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

class User {
  // Constructor
  constructor(first_name, last_name, email, phone, comments) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.comments = comments;
  }

  // Return a list of all users
  static fetchAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE status != "removed"',
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  // Find user by first name or last name
  static findUser(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
        ["%" + name + "%", "%" + name + "%"],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  // Insert new user
  insertUser() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
        [
          this.first_name,
          this.last_name,
          this.email,
          this.phone,
          this.comments
        ],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  // Search user by id
  static findById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user WHERE id = ?", [id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Update user
  updateUser(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
        [
          this.first_name,
          this.last_name,
          this.email,
          this.phone,
          this.comments,
          id
        ],
        (err, _) => {
          if (err) reject(err);
          else {
            connection.query(
              "SELECT * FROM user WHERE id = ?",
              [id],
              (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
              }
            );
          }
        }
      );
    });
  }

  // Update user status
  static updateUserStatus(id, status) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET status = ? WHERE id = ?",
        [status, id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = User;
