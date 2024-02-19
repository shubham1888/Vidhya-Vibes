const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")

app.use(express.json());
const conn = () => {
    mongoose.connect("mongodb+srv://kali:kali@cluster0.xsd2e.mongodb.net/")
}
conn()

const qnSchema = new mongoose.Schema({
    title: String,
    time: String,
    username: String,
    tags: Array
});

app.get('/', (req, res) => {
    res.send('Hello from server!')
})

app.post("/postqn", async (req, res) => {
    const qnmodel = mongoose.model('qn', qnSchema);
    const silence = new qnmodel({
        title: req.body.title,
        time: new Date().toLocaleString(),
        username: "",
        tags: []
    });
    await silence.save()
    res.send({ status: "Ok" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})