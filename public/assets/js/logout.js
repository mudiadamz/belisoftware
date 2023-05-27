
function logout(){
  firebase.auth().signOut().then(() => {
    redirect( "/" );
  }).catch((error) => {
    // An error happened.
  });
}