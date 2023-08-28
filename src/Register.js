import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth,storage} from './Firebase_config';
import firebaseConfig from './firebase';
import { collection, addDoc,doc ,updateDoc,getDocs,getDoc, query, where, onSnapshot} from "firebase/firestore"; 
import { useLocation } from 'react-router-dom';


import { FirebaseError } from 'firebase/app';
import student from './student';


export default function Register(props) {
  
  const location = useLocation();
  var user = location.state; 

  //showing the documents
 const showdocuments=async ()=>{
  
  const q = query(collection(storage, "university"), where("university_name", "==", "Arya College"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
        cities.push(doc.data().university_name);
    });
    console.log("Current cities in CA: ", cities.join(", "));
  });
 
  


 }
 const [email,Setemail]=useState("");
const [password,Setpassword]=useState("");
const [university_name,setUniversityName]=useState("")
const [repassword,setRePassword]=useState("")
const [name,setName]=useState("")
  
const auth = getAuth();
//This Fucntion is used for add data into firestore
  const user1=async (email,password,university_name,name)=>
  {
    if(user=="university"){
      try {
        const docRef = await addDoc(collection(storage, "university"), {
          email: email,
          password: password,
          university_name: university_name,
          students:[],
          notifications:[]
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      } 
    }
    else
    {
      

      const querySnapshot = await getDocs(collection(storage, 'university'), where('university_name', '==', 'Arya College'));
// Replace 'your_collection_name_here' with the actual name of your collection
// Replace 'name' with the field name you're searching by
// Replace 'searched_name' with the name you're searching for

querySnapshot.forEach(async (doc) => {
  const docRef = doc.ref;
  // Get the current data from the document
  const currentData = doc.data().students;

  // Modify the 'courses' array
  const updatedCourses = [...currentData, {email:email,password:password,name:name,documents:[]}]; // Add a new course

  // Update the document with the modified 'courses' array
  await updateDoc(docRef, { students: updatedCourses });
});
      
      
      

  
    }
  }


  




const signup=()=>{

  if(password!=repassword)
    {
      alert("Sorry you have entererd wrong password");
      return ;
    }
    

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Registered");
    user1(email,password,university_name,name)
    
    // ...
  })
  .catch((error) => {
    alert("error")
    const errorCode = error.code;
    alert(error.code)
    const errorMessage = error.message;
    // ..
  });
}

  return (
    <section class="vh-100" style={{BackgroundColor: "#eee"}}>
      <button onClick={()=>showdocuments()}>Please Click On Me</button>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{BorderRadius: "25px"}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">
                {user=="student"?<><div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" onChange={(e)=>setName(e.target.value)}/>
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>
                  </>:""
  }
                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" onChange={(e)=>setUniversityName(e.target.value)}/>
                      <label class="form-label" for="form3Example1c">University name</label>
                    </div>
                  </div>
                  

                  
                 
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control"  onChange={(e)=>{Setemail(e.target.value)}}/>
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" onChange={(e)=>Setpassword(e.target.value)}/>
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" class="form-control"  onChange={(e)=>setRePassword(e.target.value)}/>
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" onClick={()=>{signup()}}>Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
