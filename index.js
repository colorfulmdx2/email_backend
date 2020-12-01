const express = require('express')
const nodemailer = require("nodemailer")

const cors = require("cors")

const bodyParser = require('body-parser')
const app = express()


const whitelist = ['http://localhost:3000', 'https://colorfulmdx2.github.io'];


app.use(cors({
    origin: whitelist,
    methods: "GET,PUT,POST,DELETE, OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204
}));

app.use(function(req, res, next) {
    if(whitelist.indexOf(req.headers.origin) > -1) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || 'colorfulmdx2@gmail.com'
let smtp_password = process.env.SMTP_PASSWORD || 'hxcc4458'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user 'colorfulmdx2@gmail.com'
        pass: smtp_password, // generated ethereal password 'hxcc4458'
    },
});

app.get('/', (req, res) => res.send('Hello'))

app.post('/sendMessage', async function (req, res) {

    let {email, name, subject, message} = req.body

    let info = await transporter.sendMail({
        from: 'Dimych', // sender address
        to: "colorfulmdx4@gmail.com", // list of receivers
        subject: "Testing gmail", // Subject line
        //text: "Hello Vik sap?", // plain text body
        html:
                `<div>
                    from <b>${name}</b>
                </div>
                <div>
                     ${subject}
                </div>
                <div>
                    ${message}
                </div>
                <div>
                    email => ${email}
                </div>`

        , // html body
    });

    res.send('sendMessage!')
})

let port = process.env.PORT || 3010

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})