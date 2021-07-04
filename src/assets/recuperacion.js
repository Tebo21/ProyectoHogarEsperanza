
function EmailA(correo) {
    alert(correo)
    let jConfig = {
        "host": "smtp.ethereal.email",
        "port": 587,
        "secure": false,
        "auth": {
            "type": "login",
            "user": "angeline.hermann@ethereal.email",
            "pass": "1sHzFNA3XRCRP94aSB"
        }
    };

    let email = {
        from: "franklin.lucero.est@tecazuay.edu.ec",  //remitente
        to: "fabipat44@gmail.com",  //destinatario
        subject: "Nuevo mensaje de usuario",  //asunto del correo
        html: ` 
           <div> 
           <p>Hola amigo</p> 
           <p>Esto es una prueba del vídeo</p> 
           <p>¿Cómo enviar correos eletrónicos con Nodemailer en NodeJS </p> 
           </div> 
       `
    };

    let createTransport = nodemailer.createTransport(jConfig);
    createTransport.sendMail(email, function (error, info) {
        if (error) {
            console.log("Error al enviar email");
        } else {
            console.log("Correo enviado correctamente");
        }
        createTransport.close();
    });
}