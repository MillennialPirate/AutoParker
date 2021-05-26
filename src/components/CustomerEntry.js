import React from 'react';
import './styles.css';
import Login from './AdminLogin';
import {auth} from '../firebase/firebase'; 
import Info from './Information';
class Customer extends React.Component 
{ 
    constructor(props) 
    { 
        super(props); 
        this.state = 
        { 
            status: "register",
            email: "",
            password: "" ,
            uid: "",
        } 
        this.checkStatus = this.checkStatus.bind(this);
        this.login = this.login.bind(this); 
        this.onChangeInput = this.onChangeInput.bind(this);
        this.register = this.register.bind(this);
    } 
    onChangeInput(e)
    {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name] : value});
    }
    register(e)
    {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
            this.setState({uid: userCredential.user.uid});
            this.setState({status: "form"});
        })
        .catch((err) => {
            ////console.log(err);
            switch (err.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                window.alert("Please try again! Invalid email id or email already in use")
                break;
              case "auth/weak-password":
                window.alert("Please enter a stronger password");
                break;
              default: ////console.log("Hello");
            }
          });
        
    }
    login(e)
    {
        e.preventDefault();
        this.setState({status: "login"});
    }
    checkStatus() 
    { 
        if (this.state.status === "register") 
        { 
            return (
            <div>
                <div style={{textAlign:"center"}}>
                    <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                </div>
                <div class = "container">
                    <div style={{paddingTop:"5%"}}></div>
                    <div class = "text-center">
                    <h1 class = "title">Customer Signup</h1>
                    <main class="form-signin">
                        <form onChange = {this.onChangeInput}>
                            <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

                            <div class="form-floating">
                            <input type="email" class="form-control" name = "email" id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating">
                            <input type="password" class="form-control" name = "password" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Password</label>
                            </div>
                            
                           
                        </form>
                    </main>
                    <button class="button1" type="submit" onClick = {this.register}>Sign up</button>{"  "}<button class = "button2" onClick = {this.login}>Login</button>
                    <p class="mt-5 mb-3 text-muted" style={{fontSize:"1rem"}}>&copyright; 2021–2022</p>
                    </div>
                    
                </div>
            </div>
            ) 
        } 
        if(this.state.status === "login")
        {
            return <Login/>
        }
        if(this.state.status === "form")
        {
            return <Info uid = {this.state.uid}/>
        }
    } 
    render() { 
        return this.checkStatus(); 
    } 
} 
export default Customer;