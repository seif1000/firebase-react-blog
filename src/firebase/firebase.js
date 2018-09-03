import firebase from 'firebase';

var devConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXX"
  };
  var prodConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXX"
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

