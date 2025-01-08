const nodemailer = require('nodemailer');



const SendMail = (PersonReceive ,OTP,content) =>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Mail,
          pass: process.env.PASSWORD
        }
      });

    var mailOptions = {
        from: 'loikogay2003@gmail.com',
        to: PersonReceive,
        subject: 'Sending Email From Tash Manager',
        html: content
      }

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports =SendMail