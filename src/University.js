import React, { useEffect, useState } from 'react'
import {auth,storage} from './Firebase_config';
import { collection, addDoc,doc ,updateDoc,getDocs,getDoc, query, where, onSnapshot} from "firebase/firestore"; 
import { Location,useLocation } from 'react-router-dom';
import { create, urlSource } from 'ipfs-http-client'
import { Web3Storage } from 'web3.storage'
export default function University() {
 


    const [students,setStudents]=useState([]);
    const [notifications,setNotifications]=useState([]);
    const [loading,setLoading]=useState(true);
    const location=useLocation();
    const [urlArr, setUrlArr] = useState([]);
  const email=location.state
  const [file, setFile] = useState("");

  const getdata1=async (studentemail,cid)=>{

    const querySnapshot = await getDocs(collection(storage, 'university'));

querySnapshot.forEach(async (doc) => {
  
    const docRef = doc.ref;
    const students = doc.data().students;
  
    for (var i = 0; i < students.length; i++) {
      if (students[i].email == studentemail) {
        const currentStudent = students[i];
        const currentDocuments = currentStudent.documents;
  
        // Assuming 'cid' is the new document ID or data you want to add
        const updatedDocuments = [...currentDocuments, {name:file,id:cid}];
  
        // Create an updated student object with the modified documents array
        const updatedStudent = {
          ...currentStudent,
          documents: updatedDocuments
        };
  
        // Create an array with the updated student and other existing students
        const updatedStudents = students.map(student => {
          if (student.email === studentemail) {
            return updatedStudent;
          } else {
            return student;
          }
        });
  
        // Update the document with the modified students array
        await updateDoc(docRef, { students: updatedStudents });

}
    }
  })
}   
    const demo=async (studentemail)=>{
    // Construct with token and endpoint
const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQzN2Y5NGQ5ZjlDMGE3YzZCODcwN0NGMzVjYzc0MmZkRmE0MTIxQjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTMwMzUxNjcxNzMsIm5hbWUiOiJCTE9DS0NIQUlOX1BST0pFQ1QifQ.zDGuOoQ1Wtf3dB6KOZeK5712jfzsZ2qCoDgGWZI4AH4"})
alert("hi")
const fileInput = document.querySelector('input[type="file"]');


// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files) // Promise<CIDString>
    getdata1(studentemail,rootCid)

  }
  const getname=()=>{

    const fullPath=(document.getElementById("f").value)
    const startIndex = fullPath.lastIndexOf('\\') + 1; // Find the last backslash position
    const fileName = fullPath.slice(startIndex); // Get the file name after the last backslash
    setFile(fileName);
  }
  const getfiles=async ()=>{
    var cid="bafybeidvzgsrfewzyyb5psbilfhap4dqpzmqqu4l24uxpb3svtsnn6ivtm"
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQzN2Y5NGQ5ZjlDMGE3YzZCODcwN0NGMzVjYzc0MmZkRmE0MTIxQjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTMwMzUxNjcxNzMsIm5hbWUiOiJCTE9DS0NIQUlOX1BST0pFQ1QifQ.zDGuOoQ1Wtf3dB6KOZeK5712jfzsZ2qCoDgGWZI4AH4"})
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
  }

  // unpack File objects from the response
  const files = await res.files()
  
  for (const file of files) {
    console.log(`${file.cid} --  ${file.path} -- ${file.size}`)
  }
  }
  const getdata= async()=>{
    
    const querySnapshot = await getDocs(collection(storage, 'university'));
    // Replace 'your_collection_name_here' with the actual name of your collection
    // Replace 'name' with the field name you're searching by
    // Replace 'searched_name' with the name you're searching for
    
    querySnapshot.forEach(async (doc) => {
      
     const data1=doc.data().students
     const data2=doc.data().notifications;
      alert(notifications.length)
      // Get the current data from the document
      if(email==doc.data().email){
      setStudents(data1)
      setNotifications(data2);
      }
     
      
    });
  } 
  
    
  useEffect(()=>{
    getdata()
  },[])
 
  return (
    <div>
<center><h1>Students</h1></center>
   
      <button onClick={()=>getfiles()}>CLickon me</button>
      
      {
      students.length?students.map((student,i)=>{
        return (
        <>
        
        <div className="row">
          <div className='col-md-6'>
          <h3 key={i}>{student.name}</h3>
          </div>
          <div className='col-md-6'>
          <h3>{student.email}</h3>
          
          </div>
        </div>
        </>
        )
      }):""

    }
    <center><h2>Notification of Student to upload their data</h2></center>
    {
      notifications.length?notifications.map((notification,i)=>{
        return (
        <>
        
        <div className='row' key={i} style={{marginTop:'2%'}}>
          <div className='col-md-6'>
          <h3>{notification.email}</h3>
          </div>
          <div className='col-md-3'>
          <input type="file" id="f" onChange={()=>{getname()}}></input>
          </div>
          <div className='col-md-3'>
          <button onClick={()=>demo(notification.email)}>Upload</button>
          </div>
         
        </div>
        
        </>
        )
      }):""

    }    
    
    </div>
  )
}
