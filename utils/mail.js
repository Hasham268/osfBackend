import nodemailer from "nodemailer";

export const sendMail = async (subject, message, send_from, replyTo, send_to) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: "587",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    const options = {
        from: send_from,
        to: send_to,
        replyTo: replyTo,
        subject: subject,
        html: message
    }

    transporter.sendMail(options, function(err, info) {
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    }) 
}

export default sendMail;
