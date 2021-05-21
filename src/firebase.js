import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

 
  // Your web app's Firebase configuration
  let firebaseConfig = {
    apiKey: "AIzaSyB_yKMhCN8gGOK9w76BEa0mD9EHEuGcQOI",
    authDomain: "cursoudemy-redux-jairo.firebaseapp.com",
    projectId: "cursoudemy-redux-jairo",
    storageBucket: "cursoudemy-redux-jairo.appspot.com",
    messagingSenderId: "458265640671",
    appId: "1:458265640671:web:7d85ff77763a35e654f36a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore().collection('favs')

  export function getFavs(uid){
     return db.doc(uid).get()
     .then(snap => {
        return snap.data().array
     })
  }

  export function updateDB(array, uid){
    return db.doc(uid).set({ array })  //Con el uid detecto a cada usuario, con .doc y set 
  }                                              //guardo los favs de c/user, firebase recibe solo obj, 
                                                 // por eso el array, es pasado dentro de un obj con el atributo favoritos
  export function loginWithGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider()
     return firebase.auth().signInWithPopup(provider)
     .then(snapshot=> snapshot.user)
  }

  export function signOutGoogle(){
      firebase.auth().signOut()
  }