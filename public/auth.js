const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn')
const whenSignedOut = document.getElementById('whenSignedOut')

const signInButton = document.getElementById('signInButton')
const signOutButton = document.getElementById('signOutButton')

const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider()

signInButton.onclick = () => auth.signInWithPopup(provider)

signOutButton.onclick = () => auth.signOut()

auth.onAuthStateChanged(user => {
    if (user) {
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = '<h3>Hello ' + user.displayName + '!</h3>'
    } else {
        whenSignedOut.hidden = false
        whenSignedIn.hidden = true
        userDetails.innerHTML = "";
    }
})

