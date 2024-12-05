import 'dotenv/config'
import axios from 'axios'
import express from 'express'

const app = express()

const access_token = process.env.access_token
const port = process.env?.port ? process.env?.port : 3000
const domain = process.env?.domain ? process.env?.domain : "agoi_sochi"

app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET,PATCH");
    next();
});

app.get('/', async (req, res) => {

    let states = []

    const response = await axios.post('https://api.vk.com/method/wall.get', {
        domain: domain,
        access_token: access_token,
        v: "5.199"
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    )

    for (let element of response?.data?.response?.items) {

        const description = element?.text

        let state = element?.attachments.find((el) => el?.type == "link")
        if (state) {

            console.log(state)

            let link = state?.link
            states.push({
                title: link?.title,
                url: link?.url,
                photo: link?.photo?.orig_photo?.url,
                description: description
            })
        }
    }

    res.json(states)

})

app.listen(port, () => {
    console.log(`Backend for Legenda states listening on port ${port}`)
})
