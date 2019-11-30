import app from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBTDInKWnYFX2d_620rvXOdHQL06gWFqBY',
  authDomain: 'urlshortener-95470.firebaseapp.com',
  databaseURL: 'https://urlshortener-95470.firebaseio.com',
  projectId: 'urlshortener-95470',
  storageBucket: 'urlshortener-95470.appspot.com',
  messagingSenderId: '341351651375',
  appId: '1:341351651375:web:913d46133533832870ceda',
  measurementId: 'G-3S6PNGD388'
}

class Firebase {
  constructor () {
    app.initializeApp(config)

    this.auth = app.auth()
    this.auth.languageCode = 'es'
    this.googleProvider = new app.auth.GoogleAuthProvider()
  }
}
export default Firebase
