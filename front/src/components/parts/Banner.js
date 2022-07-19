import React from "react";
import logo from '../../assets/svg/icon-left-font.svg';
import{Link} from 'react-router-dom'
import '../../styles/parts/css/Banner.css'

export default function Banner()
{
    return(
        <header>
            
            <nav>
                <Link to="/home"><img src={logo} alt=""></img></Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Log In</Link>
            </nav>
        </header>
    )
}