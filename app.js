require('dotenv').config()
const express = require('express')
const StuffRouter = require("./router/stuffRouter")
const userRouter = require("./router/userRouter")
const cors = require("./config/corsConfig")
const db = require("./config/db")

const app = express();

db.connect()

app.use(express.json())

app.use(cors.config)

app.use('/api/stuff', StuffRouter)
app.use('/', userRouter)

module.exports = app;