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
      Navigate("database")
    } else {
      alert("Wrong password!");
    }
    e.preventDefault();
  }
  
  return (
    <>
      <div className='top_right'>
        <img src={icons} alt="Icons" width={50}/>
      </div>
      <div className='center'> 
        <img src={avatar} alt="Avatar" width={70}/>
      </div>
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Password:{" "}
          <input type="text" value={password} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    </>
  )
}

export default PasswordLock