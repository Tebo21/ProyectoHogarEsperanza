'use strict';
const nodemailer = require('nodemailer');
//main()
async function main(correo, nombres, codigo) {
    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'erick.valverde.est@tecazuay.edu.ec',  
            pass: 'hulsxefjlciobyyr'
        }
    });

    const info = transporter.sendMail({
        from: '"Fundación Hogar Esperanza👻" <hogar.esperanza.asistencia@gmail.com>',
        //to: "franklin.lucero.est@tecazuay.edu.ec, erick.valverde.est@tecazuay.edu.ec", 
        to: correo, 
        subject: "Recuperación de contraseña",
        text: 'Hola ' + nombres + ' \n' + 'tu contraseña temporal es *' + codigo + '* \n' + 'por favor cambiala una vez ingreses a tu cuenta dirigiendote a tu perfil' + ' \n' + '*Este mensaje no debe ser repondido ya que se genera de forma automática  :)*',
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}