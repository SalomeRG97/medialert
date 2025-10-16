import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
});

export const sendResetEmail = async (email, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await mailer.sendMail({
    from: "noreply@techchallenge.com",
    to: email,
    subject: "Recupera tu contraseña",
    html: `<p>Haz clic aquí para restablecer tu contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  });
};
