import {
  findByEmail,
  findByValidToken,
  saveResetToken,
  updatePassword,
} from "../repositories/user.repository.js";

import { sendResetEmail } from "../utils/mailer.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const forgotPassword = async (email) => {
  const user = await findByEmail(email);
  if (!user) throw new Error("Usuario no encontrado.");

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 3600000;
  await saveResetToken(email, token, expires);
  await sendResetEmail(email, token);
};

export const resetPassword = async (token, newPassword) => {
  const user = await findByValidToken(token);
  if (!user) throw new Error("Token inválido o expirado.");

  const hashed = await bcrypt.hash(newPassword, 10);
  await updatePassword(user.email, hashed);
  await saveResetToken(user.email, null);
};
