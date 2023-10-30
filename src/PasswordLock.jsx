import './App.css'
<<<<<<< HEAD
import avatar from "./assets/INFO418_login_avatar.png"
import icons from "./assets/INFO418_login_icons.png"
=======
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';
>>>>>>> bced9f646ee20058ced96dce1197410d37d216db

const PasswordLock = () => {
  const [password, setPassword] = useState("");
  
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (password === "7534186168") {
      Navigate("database")
    } else {
      alert("Wrong password!");
    }
    e.preventDefault();
  }
  
  return (
    <>
<<<<<<< HEAD
      <div className='top_right'>
        <img src={icons} alt="Icons" width={50}/>
      </div>
      <div className='center'> 
        <img src={avatar} alt="Avatar" width={70}/>
      </div>
=======
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Password:{" "}
          <input type="text" value={password} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit"></input>
      </form>
>>>>>>> bced9f646ee20058ced96dce1197410d37d216db
    </>
  )
}

export default PasswordLock