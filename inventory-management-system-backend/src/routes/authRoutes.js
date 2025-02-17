const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const User = require("../db/userModel");
const apiToken = process.env.API_TOKEN;

router.post("/register", auth("operator"), (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

router.post("/change-password", (request, response) => {
  const { email, currentPassword, newPassword } = request.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: "User not found",
        });
      }

      bcrypt
        .compare(currentPassword, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Current password is incorrect",
            });
          }

          bcrypt
            .hash(newPassword, 10)
            .then((hashedNewPassword) => {
              user.password = hashedNewPassword;

              user
                .save()
                .then(() => {
                  response.status(200).send({
                    message: "Password updated successfully",
                  });
                })
                .catch((error) => {
                  response.status(500).send({
                    message: "Error updating password",
                    error,
                  });
                });
            })
            .catch((error) => {
              response.status(500).send({
                message: "Error hashing the new password",
                error,
              });
            });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Error comparing current password",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error finding user",
        error,
      });
    });
});

router.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
              roles: user.roles,
            },
            apiToken,
            { expiresIn: "1h" }
          );

          response.status(200).send({
            id: user._id,
            email: user.email,
            roles: user.roles,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

module.exports = router;
