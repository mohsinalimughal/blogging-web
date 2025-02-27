    import { collection, doc, getDocs,query,where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
    import { Auth,db } from "./firebase.js";
    import {  onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

var uid = null

console.log("app js");

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
            <div class="col-lg-4 col-md-6 mb-4">
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
                        <a id="readmorebtn" data-blog-id="${doc.id}"   class="btn btn-primary btn-sm readmorebtn">Read More</a>
                        </div>
                        </div>
                        </div>
                        </div>
        `;
        
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
        
        
        // const readmoreBtn = document.querySelectorAll("#readmorebtn")
        // console.log(readmoreBtn)
        
        // readmoreBtn.addEventListener("click",()=>{
        //       console.log("clicked")
        //   })


        blogsContainer.addEventListener("click", (event) => {
            if (event.target && event.target.classList.contains("readmorebtn")) {
                const blogId = event.target.dataset.blogId; // Use data attributes to store blog ID
                console.log("Read More button clicked for blog ID:", blogId);
                // Add your logic here
            }
        });

      
      export {profilepiclink,fullname,uid}





