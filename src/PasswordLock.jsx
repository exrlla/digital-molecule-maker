import './App.css'
import avatar from "./assets/INFO418_login_avatar.png"
import icons from "./assets/INFO418_login_icons.png"

function PasswordLock() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='top_right'>
        <img src={icons} alt="Icons" width={50}/>
      </div>
      <div className='center'> 
        <img src={avatar} alt="Avatar" width={70}/>
      </div>
    </>
  )
}

export default PasswordLock