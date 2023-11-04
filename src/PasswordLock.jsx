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
    if (password === "7534186168") {
      // go to maker page
      window.location.replace("https://www.google.com/");
      Navigate("database")
    } else {
      alert("Wrong password!");
    }
  }
  
  return (
    <>
      <div  style={{backgroundImage: `url("/src/assets/INFO418_login_background.webp")`}}>
        <div className='top_right'>
          <img src={icons} alt="Icons" width={60}/>
        </div>
        <div className='center'> 
          <img src={avatar} alt="Avatar" width={120}/>
        </div>
        <h1>Enter Password</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" value={password} onChange={handleChange}>
            </input>
            <button type="submit">Submit</button>
          </label>
        </form>
      </div>
    </>
  )
}

export default PasswordLock