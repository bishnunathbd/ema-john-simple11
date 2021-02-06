import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}


// Google sign in 
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}


// Facebook sign in
export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      const user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage);
    });
}


// sign out
export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      };
      return signedOutUser;
    })
    .catch(err => {
      // an error happened
    })
}


export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

// sign in with email & password
export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}


const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
  }).then(function () {
    console.log('user name updated successfully.');
  }).catch(function (error) {
    console.log(error);
  });
}