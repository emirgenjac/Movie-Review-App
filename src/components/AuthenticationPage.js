import React from "react";
import { Link } from 'react-router-dom'
import './AuthenticationPage.css'


const AuthenticationPage = () => {
    return(
        <div className="div-container">
            <h1 className="welcome-text">
                 Welcome to Emir's Movie Review App. Please Login or Register.
            </h1>
            <div className="choose-option">
                <div className="login-container">
                    <p className="login">
                       <Link to="/login" relative="path" style={linkStyle}> Login </Link>
                    </p>
                </div>

                <div className="register-container">
                    <p className="register">
                    <Link to="/register" relative="path" style={linkStyle}> Register </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

const linkStyle = {
    textDecoration: "none",
}

export default AuthenticationPage;