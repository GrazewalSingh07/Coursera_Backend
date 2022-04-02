const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
module.exports=nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "e12b504b8b57d6", // generated ethereal user
    pass: "d0db043e237ea4", // generated ethereal password
  },
});
