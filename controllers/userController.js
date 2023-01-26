const User = require("../models/user");

// View Users
exports.view = (req, res) => {
  const removedUser = req.query.removed;
  User.fetchAll()
    .then((rows) => {
      res.render("home", { rows, removedUser });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Find User by Search
exports.find = (req, res) => {
  User.findUser(req.body.search)
    .then((rows) => {
      res.render("home", { rows });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Add user form
exports.form = (_, res) => {
  res.render("add-user");
};

// Add user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  new User(first_name, last_name, email, phone, comments)
    .insertUser()
    .then(() => {
      res.render("add-user", { alert: "User added successfully." });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Edit user form
exports.edit = (req, res) => {
  User.findById(req.params.id)
    .then((rows) => {
      res.render("edit-user", { rows });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  const updatedUser = new User(first_name, last_name, email, phone, comments);
  updatedUser
    .updateUser(req.params.id)
    .then((rows) => {
      res.render("edit-user", {
        rows,
        alert: `${first_name} has been updated.`
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Hide a user
exports.delete = (req, res) => {
  User.deleteUser(req.params.id)
    .then(() => {
      res.redirect("/?removed=1");
    })
    .catch((err) => {
      console.error(err);
    });
};

// View user info
exports.viewall = (req, res) => {
  User.findById(req.params.id)
    .then((rows) => {
      res.render("view-user", { rows });
    })
    .catch((err) => {
      console.error(err);
    });
};
