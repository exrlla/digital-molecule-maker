import './App.css'
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';

const PasswordLock = () => {
  const [password, setPassword] = useState("");
  
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (password === "75341861") {
      // go to maker page
    } else {
      alert("Wrong password!");
    }
    e.preventDefault();
  }
  
  return (
    <>
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