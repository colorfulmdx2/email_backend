const express = require('express')
const nodemailer = require("nodemailer")

const cors = require("cors")

const bodyParser = require('body-parser')
const app = express()


app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || '---'
let smtp_password = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user 'colorfulmdx2@gmail.com'
        pass: smtp_password, // generated ethereal password 'hxcc4458'
    },
});

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