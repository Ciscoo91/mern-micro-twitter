import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyByH4qKb4ZjdevEbd87OKKCxtF3D2vrdU4",
    authDomain: "mern-micro-twitter.firebaseapp.com",
    databaseURL: "https://mern-micro-twitter.firebaseio.com",
    projectId: "mern-micro-twitter",
    storageBucket: "mern-micro-twitter.appspot.com",
    messagingSenderId: "76015289306",
    appId: "1:76015289306:web:2f15139f3ab9635714b6e3",
    measurementId: "G-9DP6JZ1ZKG"
}

firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage,
    firebase as default
}
