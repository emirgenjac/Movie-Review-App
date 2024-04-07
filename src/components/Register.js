import React from "react";
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
    return(
        <div className="register-div-container">

            <div className="register-div">

                <h3 className="register-header">Register</h3>  
                
                <div className="register-form">
                    <div className="register-info">
                <label>First Name</label> 
                <input type="text"/>

                <label>Last Name</label>
                <input type="text"/>

                <label>E-Mail</label>
                <input type="email"/>

                <label>Password</label>
                <input type="password"/>
                </div>

                <div className="validation-message">
                hi
                </div>
            </div>
                <div className="button-container">
                    <button>   <Link to="/home" relative="path" style={linkStyle}>   Register   </Link> </button>
                    <button>   <Link to="/login" relative="path" style={linkStyle}>   Switch to Login  </Link>   </button>
                </div>
            </div>
        </div>
        
    )
}

const linkStyle = {
    textDecoration:"none",
    color:"var(--text-color)"
}

export default Register