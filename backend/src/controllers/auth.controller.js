import * as authService from "../services/auth.service.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({
      message:
        "Se ha enviado un correo con el link para recuperar tu contraseña",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res
      .status(200)
      .json({ message: "Se ha actualizado tu contraseña exitosamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
