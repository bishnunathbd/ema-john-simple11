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
        photo: photoURL
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
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // The signed-in user info.
      var user = result.user;
      return user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
      console.log('fb user after sign in', user);
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


// export const createUserWithEmailAndPassword = () => {
//   firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then((userCredential) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
// }


// export const signInWithEmailAndPassword = () => {
//   firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
// }


// const updateUserName = name => {
//   const user = firebase.auth().currentUser;

//   user.updateProfile({
//     displayName: name,
//   }).then(function () {
//     console.log('user name updated successfully.');
//   }).catch(function (error) {
//     console.log(error);
//   });
// }