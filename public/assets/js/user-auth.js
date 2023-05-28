function redirect(loc) {
  var currentPath = window.location.pathname;
  if (!currentPath.match(loc)) {
    //prevent recursive redirect
    location.href = loc + document.location.search;
  }
}

$(function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      redirect("login.html");
    }
  });
});
