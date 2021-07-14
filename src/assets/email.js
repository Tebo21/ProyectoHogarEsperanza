"use strict";
const nodemailer = require('nodemailer')
main()
async function main() {
    
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'erick.valverde.est@tecazuay.edu.ec',  
            pass: 'hulsxefjlciobyyr'
        }
    });

    let info = transporter.sendMail({
        from: '"Fred Foo 👻" <erick.valverde.est@tecazuay.edu.ec>',
        //to: "franklin.lucero.est@tecazuay.edu.ec, erick.valverde.est@tecazuay.edu.ec", 
        to: "apsg4533@gmail.com", 
        subject: "Hello ✔", 
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}