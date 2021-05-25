import React from 'react';
import './styles.css'; 
import Login from './images/login.svg';
import Register from './AdminRegister';
class ALogin extends React.Component 
{ 
    constructor(props) 
    { 
        super(props); 
        this.state = 
        { 
            status: "login",
            email: "",
            password: "" 
        } 
        this.checkStatus = this.checkStatus.bind(this); 
        this.register = this.register.bind(this);
    } 
    register(e)
    {
        e.preventDefault();
        this.setState({status: "register"})
    }
    checkStatus() 
    { 
        if (this.state.status === "login") 
        { 
            return (
            <div>
                <div style={{textAlign:"center"}}>
                    <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                </div>
                <div class = "container">
                    <div style={{paddingTop:"5%"}}></div>
                    <div class = "text-center">
                    <h1 class = "title">Admin Login</h1>
                    <main class="form-signin">
                        <form>
                            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                            <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Password</label>
                            </div>
                            
                           
                        </form>
                    </main>
                    <button class="button1" type="submit">Sign in</button>{"  "}<button class = "button2" onClick = {this.register}>Register</button>
                    <p class="mt-5 mb-3 text-muted" style={{fontSize:"1rem"}}>&copyright; 2021–2022</p>
                    </div>
                    
                </div>
            </div>
            ) 
        } 
        if(this.state.status === "register")
        {
            return <Register/>
        }
    } 
    render() { 
        return this.checkStatus(); 
    } 
} 
export default ALogin;