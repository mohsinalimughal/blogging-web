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
        await getDataFromFirestore()
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
    
    const blogbtn = document.querySelector("#blog-btn")
    const errormessage = document.querySelector("#error-message")
    
    
    
    
    blogForm.addEventListener("submit", async (e) => {
        e.preventDefault(); 
       
    errormessage.classList.add("d-none")
    errormessage.innerHTML = ""

    if (blogTitle == null || blogDescription == null || profileimagelink == null) {

        errormessage.classList.remove("d-none")
        errormessage.innerHTML = "Please upload image and fill all the fields"
        return
    }



        blogbtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> blog uploading...`;
        blogbtn.disabled = true;
        
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
            blogbtn.innerHTML = `Upload Blog`;
            blogbtn.disabled = false;
            blogTitle.value = "";
            blogDescription.value = "";
            profileimagelink = null
            alert("Blog added successfully!");
    
    } catch (error) {
        console.error("Error adding blog:", error);
        blogbtn.disabled = false;
    }
        



        





});


const blogsContainer = document.querySelector("#blogsContainer1")

blogsContainer.innerHTML = ""
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

    async function getDataFromFirestore() {
    const q = query(collection(db, "blogs"), where("userid", "==", uid));
    console.log("Fetching blogs for UID:", uid);
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
   
        querySnapshot.forEach((doc) => {
            blogsContainer.innerHTML += `
                <div class="col-md-6 mb-4" id="blog-${doc.id}">
                    <!-- User Info on Top -->
                    <div class="d-flex align-items-center mb-3 p-3 bg-white shadow-sm rounded">
                        <img src="${doc.data().bloggerprofile}" class="rounded-circle me-3" width="50" height="50" alt="User Profile" loading="lazy">
                        <div>
                            <h6 class="mb-0 fw-bold">${doc.data().bloggername}</h6>
                            <small class="text-muted">Posted on ${new Date(doc.data().timestamp?.toDate()).toLocaleDateString()}</small>
                        </div>
                    </div>
        
                    <!-- Blog Card -->
                    <div class="card border-0 shadow-sm">
                        <img src="${doc.data().image}" class="card-img-top" alt="Blog Image" loading="lazy" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${doc.data().blogtitle}</h5>
                            <p class="card-text text-muted">${doc.data().blogdescription}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="blog-details.html?id=${doc.id}" class="btn btn-primary btn-sm">Read More</a>
                                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${doc.id}">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
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
   
   
   
   
   
   
