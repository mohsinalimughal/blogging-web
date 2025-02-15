    import { collection, doc, getDocs,query,where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
    import { Auth,db } from "./firebase.js";
    import {  onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

var uid = null

    onAuthStateChanged(Auth, async (user) => {
    if (user) {
        uid = user.uid;
        console.log(uid)
        getDataFromFirestore()
        getblogsFromFirestore()
    } else {
            window.location = "login.html"
    }
    });




    const blogsContainer = document.querySelector("#blogsContainer")    
    




    const logoutBtn = document.querySelector("#logoutBtn")
    logoutBtn.addEventListener("click",()=>{
        signOut(Auth).then(() => {
            window.location = "login.html"
        }).catch((error) => {
            console.log(error)
        });
    })



    var profilepiclink = null
    var fullname = null

    async function getDataFromFirestore() {
    const q = query(collection(db, "users"), where("userid", "==", uid));
    const querySnapshot = await getDocs(q);
    // if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log(doc.data()); 
           profilepiclink =  doc.data().profileimage 
           fullname =  doc.data().fulname 
        });
        // } else {
            //     console.log("No data in the users collection.");
            // }
            updateui()
      }


const userProfilePic = document.querySelector("#userProfilePic")
const userName = document.querySelector("#userName")
      const updateui = ()=>{
         userProfilePic.src = profilepiclink
         userName.innerHTML = fullname
      }







    async function getblogsFromFirestore() {
    const q = query(collection(db, "blogs"));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            blogsContainer.innerHTML += `
     
<div class="col-md-6">
    <!-- User Info on Top -->
    <div class="d-flex align-items-center mb-2 p-2 bg-white shadow-sm rounded">
        <img src="${doc.data().bloggerprofile}" class="rounded-circle me-2" width="50" height="50" alt="User Profile">
        <h6 class="mb-0">${doc.data().bloggername}</h6>
    </div>

    <!-- Blog Card -->
    <div class="card">
        <img src="${doc.data().image}" class="card-img-top" alt="Blog Image">
        <div class="card-body">
            <h5 class="card-title">${doc.data().blogtitle}</h5>
            <p class="card-text">${doc.data().blogdescription}</p>
            <button class="btn btn-primary">Read More</button>
        </div>
    </div>
</div>  
     
     `
            // blogtitle =  doc.data().blogtitle 
            // image =  doc.data().image 
            // blogdescription =  doc.data().blogdescription 
            console.log(doc.data())
                });
        // renderblog()
    } else {
        console.log("No data in the blogs collection.");
    }
      }






      
      export {profilepiclink,fullname,uid}





