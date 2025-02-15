import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { Auth } from "./firebase.js";
import { collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {  db } from "./firebase.js"


////////////////////////////////////////////////////////////////////////////////////////////////////////////


var profileimagelink = null
// <button id="upload_widget" class="cloudinary-button">Upload files</button>
var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dvzds6sdt', 
  uploadPreset: 'my-first-preset'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      profileimagelink = result.info.secure_url
      console.log('Done! Here is the image info: ', result.info.secure_url); 
    }
  }
)
document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const errordiv = document.querySelector("#error-message")
errordiv.classList.add("d-none")
console.log("CLASS ADDED")



const form = document.querySelector(".form")
const fullName = document.querySelector("#fullName")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const signupButton = document.querySelector("#signup-btn")
form.addEventListener("submit", async (e) => {
         e.preventDefault()
    signupButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> signing in...`
    signupButton.disabled = true     
    try {
         const userCredential = await createUserWithEmailAndPassword(Auth,email.value , password.value )
          const user = userCredential.user;   
          console.log("User created:", user.uid);

          await addDoc(collection(db, "users"), {
            userid: user.uid,
            fulname: fullName.value,
            email: email.value,
            profileimage: profileimagelink
          });
        console.log("DATA ADDED")
        window.location = "login.html"

          
        }
          catch(error){
            console.log(error)
            errordiv.classList.remove("d-none")
            console.log("CLASS REMOVED");
            
            errordiv.innerHTML = `${error.code} - ${error.message}`
            signupButton.disabled = false 
          }
         }  

  )












