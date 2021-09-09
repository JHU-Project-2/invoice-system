const router = require('express').Router();
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path');
const { Sent } = require('../../models');

// Node Mailer 
router.post('/send', (req, res) => {
    // for using a template
    // var source = fs.readFileSync(path.join(__dirname, 'invoice-email.handlebars'), 'utf8');
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
        text: req.body.message,
        html: output,
        // html: template(),
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
    // add the invoice to the sent model to keep track of sent invoices
    Sent.create({
        user_id: req.session.user_id,
        invoice_id: req.body.invoice_id,
        sent_to_email: req.body.to,
        sent_by: req.session.username
    })
        .then(sentData => res.json(sentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })


})


module.exports = router