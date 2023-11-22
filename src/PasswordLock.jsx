import './App.css'
import avatar from "./assets/INFO418_login_avatar.png"
import icons from "./assets/INFO418_login_icons.png"

import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  if (hh == 0){
    hh = 12;
  } else if (hh > 12){
    hh = hh - 12;
  }

  // formatting the time to be displayed
  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;
    
  let time = hh + ":" + mm + ":" + ss;
  document.getElementById("clock").innerText = time; 
}

const PasswordLock = () => {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === "7534186168") { 
      // if password is correct, re-route to the maker page
      window.location.href = "/maker";
      Navigate("database");
    } else { 
      // if password incorrect, alert and don't change the page
      alert("Wrong password!");
    }
  }

  useEffect(() => {
    currentTime();

    // set up a timer to update the clock every second
    let t = setInterval(() => currentTime(), 1000);

    // clean up the timer
    return () => clearInterval(t);
  }, []);
  
  return (
    <>
        <div className='top_right'>
          <img src={icons} alt="Icons" width={60}/>
        </div>
        <div className='center'> 
          <img src={avatar} alt="Avatar" width={120}/>
        </div>
        <div className='clock_time' id='clock'></div>
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