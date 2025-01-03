const { resend } = require("../config/resend.js");

const getFromEmail = () => {
  return process.env.NODE_ENV === "development"
    ? "onboarding@resend.dev"
    : process.env.EMAIL_SENDER;
};

const getToEmail = (to) => {
  return process.env.NODE_ENV === "development" ? "delivered@resend.dev" : to;
};

exports.sendMail = async ({ to, subject, text, html }) => {
  return resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
};
