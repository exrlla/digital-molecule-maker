import './App.css'
import avatar from "./assets/INFO418_login_avatar.png"
import icons from "./assets/INFO418_login_icons.png"
<<<<<<< HEAD

=======
>>>>>>> 94c18a54799f6105ffe3085a2779bdc4665a0020
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const PasswordLock = () => {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (password === "7534186168") {
<<<<<<< HEAD
      // go to maker page
      window.location.replace("https://www.google.com/");
=======
      Navigate("database")
>>>>>>> 94c18a54799f6105ffe3085a2779bdc4665a0020
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
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className='center'>
=======
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
>>>>>>> 94c18a54799f6105ffe3085a2779bdc4665a0020
        <label>
          <input type="text" value={password} onChange={handleChange}>
          </input>
          <button type="submit">Submit</button>
        </label>
      </form>
    </>
  )
}

export default PasswordLock