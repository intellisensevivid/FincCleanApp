const nodemailer = require("nodemailer");

const sendVerificationEmail = async ({ from, to, subject, text, html }) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
