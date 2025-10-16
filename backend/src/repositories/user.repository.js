import User from "../models/user.model.js";
import { Op } from "sequelize";

export const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const updatePassword = async (email, password) => {
  return await User.update(
    {
      password,
      resetToken: null,
      resetTokenExpires: null,
    },
    { where: { email } }
  );
};

export const saveResetToken = async (email, token, expiresAt) => {
  return await User.update(
    {
      resetToken: token,
      resetTokenExpires: expiresAt,
    },
    { where: { email } }
  );
};

export const findByValidToken = async (token) => {
  return await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { [Op.gt]: new Date() },
    },
  });
};
