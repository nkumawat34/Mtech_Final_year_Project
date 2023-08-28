import React from 'react'
import { Link } from 'react-router-dom'
import {auth,storage} from './Firebase_config';
export default function start() {
  return (
    <div className='d-flex justify-content-center' style={{margin:"50vh"}}>

   <Link to="/student" style={{marginRight: '3%'}}><div ><button type="button" className="btn btn-secondary">Student</button></div></Link>
   <Link to="/university" style={{marginRight: '3%'}}><div ><button type="button" className="btn btn-secondary">University</button></div></Link>
    </div>
  )
}
