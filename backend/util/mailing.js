const nodemailer = require("nodemailer");

const sendVerificationEmail = async ({ from, to, subject, text, html }) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };
  console.log(process.env.PASSWORD, process.env.EMAIL);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mail = await transporter.sendMail(mailOptions);
  console.log(mail);
  return mail;
};

module.exports = { sendVerificationEmail };
