import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyBYrPYORN8Krm0P-cpKNtp0RonaPCFIVZw",
    authDomain: "raudevhack.firebaseapp.com",
    databaseURL: "https://raudevhack.firebaseio.com",
    projectId: "raudevhack",
    storageBucket: "raudevhack.appspot.com",
    messagingSenderId: "433771662326"
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp