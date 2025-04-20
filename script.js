import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA1dMX_OpYc5TDptDSOeoYcmhA7Qzu9UaE",
    authDomain: "panda-project-53973.firebaseapp.com",
    projectId: "panda-project-53973",
    storageBucket: "panda-project-53973.firebasestorage.app",
    messagingSenderId: "554939693133",
    appId: "1:554939693133:web:d8ca473217424063960404"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function handleSignup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            Swal.fire({
                title: "User Signed Up Successfully!",
                text: `${user.email}`,
                icon: "success"
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // console.log(errorCode)
            // console.log(errorMessage)

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Credentials!",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
        });
}

window.handleSignup = handleSignup;

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            Swal.fire({
                title: "User Loged In Successfully!",
                text: `${user.email}`,
                icon: "success"
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // console.log(errorCode)
            // console.log(errorMessage)

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Credentials!",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
        });

}

window.handleLogin = handleLogin;

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(`User Signed In with User ID: ${uid}`)
        if (location.pathname == "/index.html" || location.pathname == "/login.html") {
            location.href = "./admin-dashboard.html"
        }
    } else {
        console.log(`User not Signed In`)
    }
});