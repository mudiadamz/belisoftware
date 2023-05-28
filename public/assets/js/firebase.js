//Replace this config with yours
const firebaseConfig = {
  apiKey: "AIzaSyBka-vP9sJzvFjQsRMQfAmIwb_xGcr-WwQ",
  authDomain: "belisoftware.com",
  databaseURL: "https://belisoftware-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "belisoftware",
  storageBucket: "belisoftware.appspot.com",
  messagingSenderId: "447514384173",
  appId: "1:447514384173:web:05c02856d863a59632a5a4",
  measurementId: "G-8GHQME1818"
};
firebase.initializeApp(firebaseConfig);


//tables
var TABLE_ITEMS = "items";
var TABLE_ORDERS = "orders";
var TABLE_CATEGORY = "category";

//functions
function saveUserData(userId, update) {
  firebase.database().ref(TABLE_ITEMS + "/" + userId).set(update);
}

function updateUserData(userId, update) {
  firebase.database().ref(TABLE_ITEMS + "/" + userId).update(update);
}

function loadImage(imageRef) {
  var fullRef = imageRef + "_640x640";
  firebase.storage().ref(fullRef).getDownloadURL()
    .then((url) => {
      var imgDom = document.querySelector("img." + imageRef);
      imgDom.setAttribute("src", url)
    })
    .catch((error) => {
      // Handle any errors
    });

}
