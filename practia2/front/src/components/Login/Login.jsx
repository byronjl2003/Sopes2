import React from 'react';  
import './Login.css';  
import {Helmet} from "react-helmet";
class Login extends React.Component {  
    constructor(props) {
        super(props);
        
      }
    
      submitLogin(e) {}
    
      render() {
        return (
          <div className="inner-container">
             <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="header">
              Login
            </div>
            <div className="box">
    
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="login-input"
                  placeholder="Username"
                  onChange={this.props.handleuser}/>
              </div>
    
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="login-input"
                  placeholder="Password"
                  onChange={this.props.handlepass}/>
              </div>
    
              <button
                name="btnn"
                type="button"
                className="login-btn"
                onClick={this.props.loguearse}>Entrar

                </button>
            </div>
          </div>
        );
      }
    
    } 

export default Login;