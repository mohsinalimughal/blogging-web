import { collection, addDoc, getDocs,query,where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { Auth,db } from "./firebase.js";
import {  onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";   
import {profilepiclink,fullname} from "./app.js"



const blogForm = document.querySelector("#blogForm")
const blogTitle = document.querySelector("#blogTitle")
const blogDescription = document.querySelector("#blogDescription")





let uid = null

onAuthStateChanged(Auth, async (user) => {
    if (user) {
        uid = user.uid;
        getDataFromFirestore(uid)
    } else {
        window.location = "login.html"
    }
});
const logoutBtn = document.querySelector("#logoutBtn")
    logoutBtn.addEventListener("click",()=>{
        signOut(Auth).then(() => {
            window.location = "login.html"
        }).catch((error) => {
            console.log(error)
        });
    })

    


    
    
    
    blogForm.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        
        try {
            await addDoc(collection(db, "blogs"), {
            userid: uid,
            blogtitle: blogTitle.value,
            image: profileimagelink,
            blogdescription: blogDescription.value,
            bloggername: fullname,
            bloggerprofile: profilepiclink
        });
        console.log("Blog added successfully!");
    } catch (error) {
        console.error("Error adding blog:", error);
    }
});


const blogsContainer = document.querySelector("#blogsContainer")

// const renderblog = ()=>{
//      blogsContainer.innerHTML += `
     
//             <div class="col-md-6">
//                 <div class="card">
//                     <img src="" class="card-img-top" alt="Blog Image">
//                     <div class="card-body">
//                         <h5 class="card-title">Demo Blog Title</h5>
//                         <p class="card-text">This is a sample blog description. It gives an idea of how the blog will look.</p>
//                         <button class="btn btn-primary">Read More</button>
//                     </div>
//                 </div>
//             </div>

     
//      `
// }

    async function getDataFromFirestore(uid) {
    const q = query(collection(db, "blogs"), where("userid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        blogsContainer.innerHTML = ""
        querySnapshot.forEach((doc) => {
            blogsContainer.innerHTML += `
     
            <div class="col-md-6">
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

const userProfilePic = document.querySelector("#userProfilePic")
const userName = document.querySelector("#userName")
      const updateui = ()=>{
         userProfilePic.src = profilepiclink
         userName.innerHTML = fullname
      }

updateui()
   
   
   
   
   
   
