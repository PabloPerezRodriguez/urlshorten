const express = require('express')
const app = express()

app.get('/test', (req, res) => res.send('ho!'))

app.listen(7000)
