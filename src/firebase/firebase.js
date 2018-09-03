import firebase from 'firebase';

var devConfig = {
    apiKey: "AIzaSyCb_xRoBDfJSjYlVmR6UpsMSSGRCAKNHak",
    authDomain: "blog-seif.firebaseapp.com",
    databaseURL: "https://blog-seif.firebaseio.com",
    projectId: "blog-seif",
    storageBucket: "blog-seif.appspot.com",
    messagingSenderId: "697741093793"
  };
  var prodConfig = {
    apiKey: "AIzaSyDwco9QAZWKhL897kaykSS77eOsAer30qc",
    authDomain: "react-auth-prod-e5f9b.firebaseapp.com",
    databaseURL: "https://react-auth-prod-e5f9b.firebaseio.com",
    projectId: "react-auth-prod-e5f9b",
    storageBucket: "react-auth-prod-e5f9b.appspot.com",
    messagingSenderId: "605853115313"
  };
  const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

  firebase.initializeApp(config);

  

  const auth = firebase.auth();
  const db = firebase.database();
  const provider = new firebase.auth.FacebookAuthProvider()
  var stor = firebase.storage();

  export {
      auth,db,provider,stor
  }

