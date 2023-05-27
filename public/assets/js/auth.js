firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        redirect( "login.html" );
    }else {
        document.querySelector("#loading").remove();
        document.querySelector("body").style.removeProperty('overflow');
    }
});

function login(email, password, onSuccess, onError){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            if(onSuccess) onSuccess();
            var user = userCredential.user;
            redirect("../admin/index.html");
        })
        .catch((error) => {
            if(onError) onError();
            alert(error.message);
        });
}

function logout(){
    if(window.confirm("Are you sure")){
        firebase.auth().signOut().then(() => {
            redirect( "login.html" );
        }).catch((error) => {
            // An error happened.
        });
    }
}