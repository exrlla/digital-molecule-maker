import './App.css'
import Header from './Header';
import avatar from "./assets/INFO418_login_avatar.png"
import { useEffect, useState } from 'react';

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
    } else { //if password incorrect, alert and don't change the page
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
    <section>
      <Header></Header>
      
      <div
      style={{
           // centers the content vertically and horizontally
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "70vh",
      }}>
        
        <div style={{
          backgroundColor: 'gray', 
          color: 'black', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '20%',
          paddingTop: '4rem', 
          paddingBottom: '6rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          marginTop: '10%',
          borderRadius: '2rem',
          shadowOpacity: 0.8,
          shadowRadius: 2,
          }} 
          className="login-box"> 
          <img src={avatar} alt="Avatar" width={120}/>
          <form name='submit box' onSubmit={handleSubmit} className='center'>
            <label>
              <input name='password box' type="text" value={password} onChange={handleChange} autoComplete='off'>
              </input>
              <button type="submit" style={{marginLeft: '1rem', fontWeight: 'bold'}}>LOG IN</button>
            </label>
          </form>
        </div>

        {/* Below is the submit form. Handles the user inputting a password and submitting it. */}
      </div>
      <div style={{
        // position the clock in the bottom right corner
        position: "absolute",
        bottom: "2rem",
        left: "2rem",
        paddingLeft: "30px",
        fontSize: '3rem'
        }}
        className='clock_time' id='clock' />
    </section>
  )
}

export default PasswordLock