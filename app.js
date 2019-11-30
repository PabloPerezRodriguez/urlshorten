const express = require('express')
const app = express()
const SimpleDB = require('./simpledb')
const firebase = require('./firebase')

const db = new SimpleDB('./db.json')

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.post('/url', async (req, res) => {
  const key = req.body.key

  if (key === 'mykey') {
    return res.send(db.data)
  }

  const shortURL = req.body.short
  const expandedURL = req.body.long
  const _delete = req.body.delete
  if (shortURL == null) return res.status(400).end()

  if (expandedURL != null) {
    await db.set(shortURL, expandedURL)
    return res.status(204).end()
  }
  if (_delete != null) {
    await db.del(shortURL)
    return res.status(204).end()
  }
})

app.get('/:url', async (req, res) => {
  const shortURL = req.params.url
  if (shortURL == null) return res.status(400).end()
  const expandedURL = await db.get(shortURL)
  res.send(expandedURL)
})

db.load().then(() => app.listen(7000))
