const nodemailer = require("nodemailer");
const sendMail = async (options) => {
  const { from, to, subject, text, html } = options;
  console.log(process.env);
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    service: "gmail",
    auth: {
      user: "workprogexam12@gmail.com",
      pass: "workprogexam1234",
    },
  });
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendMail };
