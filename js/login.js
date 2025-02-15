import {  signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { Auth} from "./firebase.js";

const Provider = new GoogleAuthProvider();

const errordiv = document.querySelector("#error-message")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const form= document.querySelector("#form")

errordiv.classList.add("d-none");

const loginButton = document.querySelector("#login-btn")

form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    loginButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...`;
    loginButton.disabled = true;
    signInWithEmailAndPassword(Auth,email.value,password.value)
    .then(()=>{
        console.log("user logged in")
        window.location = "index.html"
    })
    .catch((error)=>{
        console.log(error)
        errordiv.innerHTML = `${error.code} - ${error.message}`;
        errordiv.classList.remove("d-none");
        loginButton.disabled = false;
    })
})


