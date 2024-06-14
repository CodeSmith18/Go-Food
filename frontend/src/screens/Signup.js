import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './Signup.css';
export default function Signup() {
         const [credentials, setCredentials] = useState({name:"",email:"",password:"",location:""})
         let navigate=useNavigate();

    const handleSubmit=async (e)=>{
          e.preventDefault();
          const response=await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,
                email:credentials.email,
                location:credentials.location,
                password:credentials.password
          })
          });
          const json= await response.json()
          console.log(json);
          if(!json.success)
            {
              alert("Enter Valid Credentials");
            }
            if(json.success)
                navigate("/");
    }

    const onchange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }
  return (
    <div  className="setLogin">
    <div className="container login" style={{width:'30rem'}}>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchange} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
    <input type="text" className="form-control" name='location' value={credentials.location} onChange={onchange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
</form>
</div>
    </div>
  )
}
