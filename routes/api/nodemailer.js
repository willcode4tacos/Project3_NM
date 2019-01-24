// var express = require('express');
// var router = express.Router();
// const nodeMailer = require('nodemailer');
// let app = express()

// router.post('/sendemail', function (req, res) {
//     console.log("heyfdsfsgfsdfdsffdsgfsgfsgh");
//     let transporter = nodeMailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'willcode4tacos@gmail.com',
//             pass: 'CodePhila7676'
//         }
//     });
//     let mailOptions = {
//         from: '"Helping Hand" <willcode4tacos@gmail.com>', // sender address
//         to: req.body.email, // list of receivers
//         subject: 'Hello!', // Subject line
//         html: 'Welcome to Helping Hand', // plain text body
//         // html: '<b>NodeJS Email</b>' // html body
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//             res.render('index');
//         });
//     });

//     module.exports = app;