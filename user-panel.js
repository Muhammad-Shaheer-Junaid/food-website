import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
    getFirestore,
    collection,
    // addDoc,
    getDocs,
    // doc,
    // deleteDoc,
    // updateDoc,
    // deleteField
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {
    getAuth,
    // createUserWithEmailAndPassword,
    // signInWithEmailAndPassword,
    // onAuthStateChanged,
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

// Initialize Firebase
// const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const productListDiv = document.getElementById("user-product-list");

// Fetch and render products
let getProductsListDiv = document.getElementById('user-product-list')
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
              <button class="btn btn-success" onclick='addToCart(${JSON.stringify({ ...doc.data(), id: doc.id })})'>
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>`;
    });
}
// window.getProductsList = getProductsList;
getProductsList();

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


// Add product to cart (localStorage)
window.addToCart = (product) => {
    // Retrieve the cart from localStorage, or initialize an empty array if not found
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the product to the cart array
    cart.push(product);

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // Display a success message using SweetAlert2
    Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.product_name} added to your cart.`,
        timer: 1500,
        showConfirmButton: false
    });
};























// window.addToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
//     cart.push(product);
//     localStorage.setItem('cartItems', JSON.stringify(cart));

//     Swal.fire({
//         icon: "success",
//         title: "Added to Cart!",
//         text: `${product.product_name} added to your cart.`,
//         timer: 1500,
//         showConfirmButton: false
//     });
// };













































// async function getUserProducts() {
//     const querySnapshot = await getDocs(collection(db, "items"));
//     querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         productListDiv.innerHTML += `
//       <div class="col-md-4 mb-4">
//         <div class="card h-100 shadow-sm">
//           <img src="${data.product_url}" class="card-img-top" alt="${data.product_name}">
//           <div class="card-body">
//             <h5 class="card-title">${data.product_name}</h5>
//             <p class="card-text">${data.product_des}</p>
//             <p class="card-text fw-bold">Rs ${data.product_price}</p>
//             <button class="btn btn-success" onclick='addToCart(${JSON.stringify({ ...data, id: doc.id })})'>
//               <i class="bi bi-cart-plus"></i> Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>`;
//     });
// }

// getUserProducts();








// Logout function (assumes you have it elsewhere or define it here)
// window.logoutUser = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     Swal.fire({
//         icon: "info",
//         title: "Logged Out",
//         timer: 1000,
//         showConfirmButton: false
//     }).then(() => {
//         window.location.href = "login.html"; // Update this path if different
//     });
// };
