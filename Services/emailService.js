const nodemailer = require("nodemailer");

function uniqueId(length) {
    var result = "";
    var characters = "123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:'zeeshanmohammad.se@gmail.com',

      pass: 'bveemducqzccfhzk',
    },
  });
  


  module.exports = {uniqueId,transporter}
