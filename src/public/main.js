
function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      
      // [END createwithemail]
    }
// SignUp
const signUpForm = document.getElementById('signup');
//const signUpForm = document.querySelector("#signup");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["email"].value;
  const password = signUpForm["password"].value;

  // Authenticate the User
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });

  fetch('/user/new', {
    method: 'POST',
    body: signUpForm
 })
 .then(function(response) {
    if(response.ok) {
        return response.text()
    } else {
        throw "Error en la llamada Ajax";
    }
 
 })
 .then(function(texto) {
    console.log(texto);
 })
 .catch(function(err) {
    console.log(err);
 });
  /*
  firebase.auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signUpForm.reset();
      // close the modal
      alert('se logro registrar')
    });*/
});

const logInForm = document.getElementById('login');
logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
    e.preventDefault();
  } else {
    e.preventDefault();
    const email = logInForm["email"].value;
    const password = logInForm["password"].value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      //document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  //document.getElementById('quickstart-sign-in').disabled = true;
});