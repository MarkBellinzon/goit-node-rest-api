// vBJA3pA#iT!4JtV1

// const ElasticEmail = require("@elasticemail/elasticemail-client");
// const { response } = require("express");
// const { ApiClient } = require("@elasticemail/elasticemail-client");
const nodemailer = require("nodemailer");
// const { createTransport } = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerconfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "mb.goit@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerconfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "mb.goit@meta.ua" };
  await transporter
    .sendMail(email)
    .then(() => {
      console.log("Mail has been sended");
    })
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;

// const { ELASTIC_API_KEY } = process.env;
// console.error(ELASTIC_API_KEY);

// const client = ElasticEmail.ApiClient.instance;
// const { apikey } = client.authentications;
// apikey.apiKey = "ELASTIC_API_KEY";
// const emailsApi = new ElasticEmail.EmailsApi();

// const sendEmail = ({ to, subject, html }) => {
//   const email = ElasticEmail.EmailMessageData.constructFromObject({
//     Recipients: [new ElasticEmail.EmailRecipient(to)],
//     Content: {
//       Body: [
//         ElasticEmail.BodyPart.constructFromObject({
//           ContentType: "HTML",
//           Content: html,
//         }),
//       ],
//       Subject: subject,
//       From: "mb.goit@meta.ua",
//     },
//   });

//   const callback = function (error, data, response) {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log("API called successfully.");
//     }
//   };

//   emailsApi.emailsPost(email, callback);
//   return true;
// };

// module.exports = sendEmail;

// const sendEmail = async (data) => {
//   try {
//     const client = ElasticEmail.ApiClient.instance;
//     const { apikey } = client.authentications;
//     apikey.apiKey = ELASTIC_API_KEY;

//     const email = { ...data, from: EMAIL_FROM };

//     const emailApiInstance = new ElasticEmail.EmailsApi();

//     const response = await emailApiInstance.Send({ body: email });
//     console.log(response);
//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return false;
//   }
// };

// module.exports = sendEmail;

// const { NODEMAILER_API_KEY, EMAIL_FROM } = process.env;

// const config = {
//   host: "smtp.meta.ua",
//   port: 587,
//   secure: false,
//   auth: {
//     user: EMAIL_FROM,
//     pass: NODEMAILER_API_KEY,
//   },
// };

// const sendEmail = async ({ to, verificationToken }) => {
//   const transporter = createTransport(config);
//   const emailOptions = {
//     from: EMAIL_FROM,
//     to,
//     subject: "Email verification link",
//     text: `Hello! Your email verification link: /users/verify/${verificationToken}`,
//   };
//   return await transporter
//     .sendMail(emailOptions)
//     .then((info) => {
//       console.log(info);
//       return true;
//     })
//     .catch((err) => {
//       console.log(err);
//       return false;
//     });
// };

// const transporter = nodemailer.createTransport(config);
// const sendEmail = {
//   from: EMAIL_FROM,
//   to: "mark.bellinzon@gmail.com",
//   subject: "Nodemailer test",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// };

// transporter
//   .sendMail(sendEmail)
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));

// module.exports = sendEmail;

// const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;

// const sendEmail = async (data) => {
//   try {
//     const client = ElasticEmail.ApiClient.instance;
//     const { apikey } = client.authentications;
//     apikey.apiKey = ELASTIC_API_KEY;

//     const email = { ...data, from: `${EMAIL_FROM}` };

//     const emailApiInstance = new ElasticEmail.EmailsApi();

//     const response = await emailApiInstance.emailSend({ body: email });
//     console.log(response);
//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return false;
//   }
// };

// module.exports = sendEmail;
