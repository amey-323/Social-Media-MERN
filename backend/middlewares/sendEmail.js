const nodeMailer= require('nodemailer');

exports.sendEmail=async(options)=>{
    var transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "324306798e918d",
          pass: "e95ed0b661a721"
        }
      });
    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailOptions);
}
