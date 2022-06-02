import React from 'react'
import { Link } from 'react-router'
import '../styles/navBar.css'
import { useLocation } from 'react-router-dom'

function HeaderView() {
  const location = useLocation();
  console.log(location.pathname);
  return location.pathname
}

export default function NavBar() {
    return (
        <>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item navbrand">
                        <a href="/" id="brandlogo">

                        <img className='navlogo' src={require("../assets/logoicon.png")} alt="LOGO NOT WORKING" srcset="" /> 
                        TRAVELER
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-sub-item-1' href="/preferences">Preferences</a>
                        <a href="/myTrips" className='nav-sub-item'>Trips</a>
                    </li>
                    <li className="nav-item">
                        <a href='/login' className="nav-btn">Sign In</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
