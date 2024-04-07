import React from "react";
import { Link } from 'react-router-dom'

import './Login.css'

const Login = () => {
    return(

        <div className="login-div-container">

            <div className="login-div">

                <h3 className="login-header">Login</h3>  
                
                <div className="login-form">
                    
                <div className="login-info1">
                <label>E-Mail</label>
                <input  className="email-input" type="email"/>
                </div>

                <div className="login-info2">
                <label>Password</label>
                <input className="register-input" type="password"/>
                </div>
                </div>

                <div className="validation-message">
                HI IM JUST HERE
                </div>

                <div className="button-container">
                    <button>    <Link to="/home" relative="path" style={linkStyle}>Login </Link></button>                      <button>   <Link to="/register" relative="path" style={linkStyle}>   Switch to Register  </Link>   </button>
                </div>
            </div>
        </div>

    )
}

const linkStyle = {
    textDecoration:"none",
    color:"var(--text-color)",
}


export default Login