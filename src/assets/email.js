let nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
function main() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'mustafa.grant17@ethereal.email',
            pass: 'sg7Gxr3pmzEgW5JWbw'
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"Fred Foo 👻" <erick.valverde.est@tecazuay.edu.ec>', // sender address
        to: "franklin.lucero.est@tecazuay.edu.ec, " + correo, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
