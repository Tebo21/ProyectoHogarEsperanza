var nodemailer = require("nodemailer");
//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "erick.valverde.est@tecazuay.edu.ec",
        pass: "frddaevwfncozenz",
    },
});

var mailOptions = {
    from: '"Hogar Esperanza 👻" <erick.valverde.est@tecazuay.edu.ec>', // sender address
    to: "masterandres18@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
