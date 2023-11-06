import './App.css'
import avatar from "./assets/INFO418_login_avatar.png"
import icons from "./assets/INFO418_login_icons.png"

import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const PasswordLock = () => {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("handling submit");
    e.preventDefault()
    if (password === "7534186168") {
      window.location.href = "/maker";
      Navigate("database");
    } else {
      alert("Wrong password!");
    }
  }
  
  return (
    <>
        <div className='top_right'>
          <img src={icons} alt="Icons" width={60}/>
        </div>
        <div className='center'> 
          <img src={avatar} alt="Avatar" width={120}/>
        </div>
        <form name='submit box' onSubmit={handleSubmit} className='center'>
          <label>
            <input name='password box' type="text" value={password} onChange={handleChange}>
            </input>
            <button type="submit">Submit</button>
          </label>
        </form>
    </>
  )
}

export default PasswordLock