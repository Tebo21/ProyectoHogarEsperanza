
"use strict";
function Principal(correo){
  require(['nodemailer']), function (nodemailer) {
  
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: 'mustafa.grant17@ethereal.email',
        pass: 'sg7Gxr3pmzEgW5JWbw'
      },
    });
  
    let info = transporter.sendMail({
      from: '"Fred Foo 👻" <erick.valverde.est@tecazuay.edu.ec>', // sender address
      to: "franklin.lucero.est@tecazuay.edu.ec, " + correo, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
  }
  
  main().catch(console.error);
}


