import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import {auth,storage} from './Firebase_config';
import { collection, addDoc,doc ,updateDoc,getDocs,getDoc, query, where, onSnapshot} from "firebase/firestore"; 

export default function Student() {

  const location=useLocation();
  const email=location.state;
  const [documents,setDocuments]=useState([]);
  const [cid,setcid]=useState("");

alert(email);
const download=()=>{

  var document_name="";
  
  for(var i=0;i<documents.length;i++)
    {
      if(documents[i].id==cid){
        document_name=documents[i].name
        alert("Hi")
      }
      
    }
    const url=cid+".ipfs.w3s.link"+"/"+document_name;
    alert(url)
  fetch(url
    )
                .then((res) => res.blob())
                .then(blob => {
                  const blobUrl = window.URL.createObjectURL(blob); // Create a Blob URL
                  const downloadLink = document.createElement('a'); // Create a link element
                  downloadLink.href = blobUrl; // Set the Blob URL as the link's href
                  downloadLink.download = document_name; // Set the desired file name
                  downloadLink.click(); // Simulate a click on the link to trigger download
                  URL.revokeObjectURL(blobUrl); // Clean up: release the Blob URL
                })


}
const getdata1=async ()=>{

  const querySnapshot = await getDocs(collection(storage, 'university'));

querySnapshot.forEach(async (doc) => {

  const docRef = doc.ref;
  const students = doc.data().students;

  for (var i = 0; i < students.length; i++) {
    if (students[i].email == email) {
      const currentStudent = students[i];
      const currentDocuments = currentStudent.documents;

    setDocuments(currentDocuments)      
        
}
  }
})
}   
  const getdata=async ()=>{
    const querySnapshot = await getDocs(collection(storage, 'university'));
  // Replace 'your_collection_name_here' with the actual name of your collection
  // Replace 'name' with the field name you're searching by
  // Replace 'searched_name' with the name you're searching for
  
  querySnapshot.forEach(async (doc) => {
    const docRef = doc.ref;
    // Get the current data from the document
    const currentData = doc.data().students;
    const currentData1 = doc.data().notifications;

    for(var i=0;i<currentData.length;i++)
      {
        if(currentData[i].email==email)
          {
            updateDoc(docRef,{notifications:[...currentData1,{email:email}]})
          }

      }
    
  });

  }
  


  return (
    <div style={{marginTop:"5%"}}>
        <center>

        <button type="button" class="btn btn-outline-primary" style={{marginLeft:"3%"}} onClick={()=>getdata1()}>Get all documents</button>
        
        <button style={{marginLeft:"5%"}} class="btn btn-outline-primary" onClick={()=>getdata()}>Upload all the documents by university</button>    
        </center>
        <center><h2 style={{marginTop:"3%"}}>Documents</h2></center>
        <div className='row' style={{marginTop:"3%"}}>
              <div className='col-md-6'>
                <center><h3>Documents Name</h3></center>
              </div>
              <div className='col-md-4' >
              <center> <h3>Content Identifier</h3></center>
              </div>
            </div>
        {
          documents.length && documents.map((document)=>{
            return (
            <>
           
            <div className='row' style={{marginTop:"1%"}}>
              <div className='col-md-6'>
            <center>  <h3>{document.name}</h3></center>
              </div>
              <div className='col-md-6'>
              <h3>{document.id}</h3>
              </div>

            </div>
            
           

            </>
            )
          })
        }
        
       <center style={{marginTop:"2%"}}> <h4>Want to download document just put your content identifier</h4>
          <label style={{fontFamily:"bold",fontSize:"20px"}}>Content Identifier</label>
          <input onChange={(e)=>setcid(e.target.value)}></input>
        <button onClick={()=>download() } style={{marginLeft:"2%"}}>Download </button>
        </center>
    </div>
  )
}
