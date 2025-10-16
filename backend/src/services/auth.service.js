import {
  findByEmail,
  findByValidToken,
  saveResetToken,
  updatePassword,
  createUser,
} from "../repositories/user.repository.js";

import { sendResetEmail } from "../utils/mailer.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const forgotPassword = async (email) => {
  const user = await findByEmail(email);

  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000;
    await saveResetToken(email, token, expires);
    await sendResetEmail(email, token);
  }

  return {
    message:
      "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
  };
};

export const resetPassword = async (token, newPassword) => {
  const user = await findByValidToken(token);
  if (!user) throw new Error("Token inválido o expirado.");

  const hashed = await bcrypt.hash(newPassword, 10);
  await updatePassword(user.email, hashed);
  await saveResetToken(user.email, null);
};

export const login = async (email, password) => {
  const user = await findByEmail(email);
  if (!user) throw new Error("Correo o contraseña inválidos.");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Correo o contraseña inválidos.");

  return {
    message: "Login exitoso",
  };
};

export const register = async (email, password) => {
  const user = await findByEmail(email);
  if (user) throw new Error("El usuario ya existe.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await createUser(email, hashedPassword);

  return {
    message: "Usuario registrado exitosamente",
  };
};
