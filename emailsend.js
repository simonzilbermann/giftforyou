const nodemailer = require('nodemailer');

module.exports={
    emailsend:(to,subject,Body)=>{
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.USER,
                pass:process.env.PASS
            }
        });
        let mailDetails = {
            from:process.env.USER,
            to,
            subject,
            html:Body  
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });  
    }
}