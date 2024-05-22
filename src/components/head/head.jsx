import React from 'react'
import { BsJustify} from 'react-icons/bs'
import './header.css'
import { useDispatch , useSelector} from 'react-redux';
import { setLogout } from '../../state/index'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';
function Header({OpenSidebar}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Call the logout endpoint
    const response = await fetch('http://localhost:3002/logout', { method: 'GET' });
    if (response.ok) {
      // Clear user state in Redux
      alert("logout successfully")
      dispatch(setLogout());

      // Redirect to login page
      navigate("/");
    } else {
      alert("Failed to log out. Please try again.");
    }
  };

  return (
   <>
    <header className='header'>
   
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
           
        </div>
        <div className='logoutbtn'>
             <button onClick={handleLogout} className="btn" >Logout</button>
        </div>
       
    </header>
    </>
  )
}

export default Header
// local , online 