import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    deleteField
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
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
const db = getFirestore(app);

// Sign Up User
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

            window.location.href = './login.html'

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


// Login User
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Store email in localStorage
        localStorage.setItem('loggedInUserEmail', user.email);
  
        Swal.fire({
          title: "User Signed In Successfully!",
          text: `${user.email}`,
          icon: "success"
        });
  
        // Redirect users onto their respective pages
        if (user.email === "shaheerjunaid.123@gmail.com") {
          location.href = "./admin-dashboard.html";
        } else {
          location.href = "./user-panel.html";
        }
  
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials!",
        });
      });
  }
  

window.handleLogin = handleLogin;

onAuthStateChanged(auth, (user) => {
    if (user) {
      const email = user.email;
      const currentPage = location.pathname;
  
      if ((currentPage === "/index.html" || currentPage === "/login.html") && email) {
        if (email === "shaheerjunaid.123@gmail.com") {
          location.href = "./admin-dashboard.html";
        } else {
          location.href = "./user-panel.html"; // Change this path to match your user interface
        }
      }
    }
  });
  


// Logout User
function logoutUser() {
    const auth = getAuth();

    signOut(auth)
        .then(() => {
            setTimeout(() => {
                console.log("User signed out successfully.");
                window.location.href = "/login.html"

                Swal.fire({
                    title: "User Signed Out Successfully!",
                    text: "You've been logged out.",
                    icon: "success"
                });
            }, 3000)
        })
        .catch((error) => {
            console.error("Error signing out:", error);
            // alert("Error while signing out");

            Swal.fire({
                icon: "error",
                title: "Error while signing out",
                // text: "Invalid Credentials!",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
        });
}

window.logoutUser = logoutUser;


// Add Products
async function addProducts() {
    // Cleared List
    getProductsListDiv.innerHTML = ""; 

    let product_id = document.getElementById("productId").value
    let product_name = document.getElementById("productName").value
    let product_price = document.getElementById("productPrice").value
    let product_url = document.getElementById("productImageUrl").value
    let product_des = document.getElementById("productDescription").value

    try {
        const docRef = await addDoc(collection(db, "items"), {
            product_id: product_id,
            product_name: product_name,
            product_price: product_price,
            product_url: product_url,
            product_des: product_des,
        });
        // Reload Page/List
        getProductsList(); 
        console.log("Document written with ID: ", docRef.id);

        Swal.fire({
            title: "Product added Successfully!",
            text: `Your Order id is: ${docRef.id}`,
            icon: "success"
        });

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

window.addProducts = addProducts;

// Get Products
let getProductsListDiv = document.getElementById('product-list')
async function getProductsList() {
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc) => {
getProductsListDiv.innerHTML += `
<div class="col-md-4 mb-4 card">
  <div class="card h-100 shadow-sm">
    <img src="${doc.data().product_url}" class="card-img-top" alt="${doc.data().product_name}">
    <div class="card-body">
      <h5 class="card-title">${doc.data().product_name}</h5>
      <p class="card-text">${doc.data().product_des}</p>
      <p class="card-text fw-bold">Rs ${doc.data().product_price}</p>
    <button onclick = "editItems('${doc.id}')" class="btn btn-info">Edit</button>
    <button onclick = "delItems('${doc.id}')" class="btn btn-danger">Delete</button>
    </div>
  </div>
</div>`;
    });
}
// window.getProductsList = getProductsList;
getProductsList();

// Delete Items
async function delItems(params) {
    // Cleared List
    getProductsListDiv.innerHTML = "";

    const cityRef = doc(db, 'items', params);
    await deleteDoc(cityRef, {
        capital: deleteField()
    });
    // Reload Page/List
    getProductsList();
}

window.delItems = delItems;

// Edit Items
let editProductDocId = "";

async function editItems(docId) {
    const docRef = doc(db, 'items', docId);
    const docSnap = await getDocs(collection(db, "items"));

    const itemSnapshot = await getDocs(collection(db, "items"));
    itemSnapshot.forEach((docu) => {
        if (docu.id === docId) {
            const data = docu.data();
            document.getElementById('editProductId').value = docId;
            document.getElementById('editProductName').value = data.product_name;
            document.getElementById('editProductPrice').value = data.product_price;
            document.getElementById('editProductImageUrl').value = data.product_url;
            document.getElementById('editProductDescription').value = data.product_des;

            editProductDocId = docId;

            // Open the modal
            const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));
            editModal.show();
        }
    });
}

window.editItems = editItems;


async function updateProduct() {
    const docRef = doc(db, 'items', editProductDocId);

    const updatedData = {
        product_name: document.getElementById('editProductName').value,
        product_price: document.getElementById('editProductPrice').value,
        product_url: document.getElementById('editProductImageUrl').value,
        product_des: document.getElementById('editProductDescription').value
    };

    try {
        await updateDoc(docRef, updatedData);

        Swal.fire({
            title: "Product Updated!",
            icon: "success",
            text: "The product has been updated successfully."
        });

        // Refresh product list
        getProductsListDiv.innerHTML = "";
        getProductsList();

        // Close modal manually
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
        editModal.hide();

    } catch (error) {
        console.error("Error updating document:", error);
        Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "There was an error updating the product."
        });
    }
}

window.updateProduct = updateProduct;




















































// async function editItems(params) {
//     // Cleared List
//     getProductsListDiv.innerHTML = "";
    
//     const cityRef = doc(db, 'items', params);
//     await updateDoc(cityRef, {
//         capital: deleteField()
//     });
//     // Reload Page/List
//     getProductsList();
// }

// window.editItems = editItems;











// function handleLogin() {
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;

//             Swal.fire({
//                 title: "User Signed In Successfully!",
//                 text: `${user.email}`,
//                 icon: "success"
//             });
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;

//             // console.log(errorCode)
//             // console.log(errorMessage)

//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Invalid Credentials!",
//                 // footer: '<a href="#">Why do I have this issue?</a>'
//             });
//         });

// }








// User State Management
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const uid = user.uid;
//         console.log(`User Signed In with User ID: ${uid}`)
//         if (location.pathname == "/index.html" || location.pathname == "/login.html") {
//             setTimeout(() => {
//                 location.href = "./admin-dashboard.html"
//             }, 3000)
//         }
//     } else {
//         console.log(`User not Signed In`)
//     }
// });
