import firebase from 'firebase/app';
import 'firebase/auth';

export default async function auth(req, res) {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, return the user object
        resolve({ user });
      } else {
        // User is not logged in
        resolve({});
      }
    });
  });
}