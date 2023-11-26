import './App.css'
import avatar from "./assets/INFO418_login_avatar.png"
import icons from "./assets/INFO418_login_icons.png"

import { useState } from 'react';

const PasswordLock = () => {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === "7534186168") { //if password is correct, re-route to the maker page
      window.open('/database', '_blank')
      window.location.href = "/maker";
      window.focus();
    } else { //if password incorrect, alert and don't change the page
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
        {/* Below is the submit form. Handles the user inputting a password and submitting it. */}
        <form name='submit box' onSubmit={handleSubmit} className='center'>
          <label>
            <input name='password box' type="text" value={password} onChange={handleChange} autoComplete='off'>
            </input>
            <button type="submit">Submit</button>
          </label>
        </form>
    </>
  )
}

export default PasswordLock