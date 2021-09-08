const router = require('express').Router();
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

// Node Mailer 
router.post('/send', (req, res) => {
    // // TEMPLATE
    // var source = fs.readFileSync(path.join(__dirname, 'invoice-email.handlebars'), 'utf8');
    // // Email Generator
    // var template = Handlebars.compile(source);

    // EMAIL TEMPLATE
    const output = `${req.body.html}`;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.nodemailer_USER,
            pass: process.env.nodemailer_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        // html: template(),
        html: output,
    };

    console.log(req.body)

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log("Email has been sent!")
            res.send('Email has been sent!"')
        }
    })
})


module.exports = router