const express = require('express')
const app = express()
const SimpleDB = require('./simpledb')
const admin = require('firebase-admin')

const serviceAccount = require('./service-account-file.json')

const db = new SimpleDB('./db.json')

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.post('/url', async (req, res) => {
  const key = req.body.key
  if (key == null) return res.status(400).end()

  try {
    const decodedToken = await admin.auth().verifyIdToken(key)

    const userRecord = await admin.auth().getUser(decodedToken.uid)
    const providerData = userRecord.providerData

    if (
      !providerData.some(
        provider => provider.email === 'pablo.rabanales@gmail.com'
      )
    ) {
      return res.status(400).end()
    }
  } catch (err) {
    console.error(err)
    return res.status(400).end()
  }

  const shortURL = req.body.short
  const expandedURL = req.body.long

  const code = req.body.code
  if (code === 'get') {
    console.log('get')

    return res.send(db.data)
  } else if (code === 'del') {
    console.log('del')

    await db.del(shortURL)
    return res.status(204).end()
  } else if (code === 'set') {
    console.log('set')

    if (shortURL == null) return res.status(400).end()
    if (expandedURL != null) {
      await db.set(shortURL, expandedURL)
      return res.status(204).end()
    }
  }
  console.log(code)

  return res.status(400).end()
})

app.get('/:url', async (req, res) => {
  const shortURL = req.params.url
  console.log(`shortened url requested: ${shortURL}`)

  if (shortURL == null) return res.status(400).end()
  const expandedURL = await db.get(shortURL)
  res.send(expandedURL)
})

db.load().then(() => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://urlshortener-95470.firebaseio.com'
  })
  app.listen(7000)
})
