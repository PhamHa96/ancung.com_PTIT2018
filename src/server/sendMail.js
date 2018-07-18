const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var router = require('express').Router();

router.post('/', sendMail);

module.exports = router;

function sendMail(req, res, next) {
    console.log(req.body);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        pool: true,
        host: 'smtp-relay.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: req.email, // generated ethereal user
            pass: req.password, // generated ethereal password
            // type: 'OAuth2',
            // clientId: '646647943021-00cqln0g4uahndb3ml8kev3nmmp2oqk6.apps.googleusercontent.com',
            // clientSecret: '6InwZfAGiNB-7ieRU7s85Tv_'
            //refreshToken: serverConfig.gmail.refresh_token,
            // accessToken: serverConfig.gmail.access_token,
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: req.email, // sender address
        to: 'nguyenngocbaothy238@gmail.com', // list of receivers
        subject: req.subject, // Subject line
        text: req.message, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

