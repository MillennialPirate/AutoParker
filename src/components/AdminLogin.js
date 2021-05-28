import React from 'react';
import './styles.css'; 
import Profile from './profile';
import Register from './AdminRegister';
import {auth} from '../firebase/firebase';
import {db} from '../firebase/firebase';
import Home from './Home';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
class ALogin extends React.Component 
{ 
    constructor(props) 
    { 
        super(props); 
        this.state = 
        { 
            uid: "",
            status: "login",
            email: "",
            password: "" ,
            name: "",
            cost: 0, 
            slots : 0,
        } 
        this.checkStatus = this.checkStatus.bind(this); 
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
    } 
    email(e)
    {
        this.setState({email: e.target.value});
    }
    password(e)
    {
        this.setState({password: e.target.value});
    }
    register(e)
    {
        e.preventDefault();
        this.setState({status: "register"})
    }
    async login(e)
    {
        e.preventDefault();
        this.setState({status:"loading"});
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (userCredential) => {
            // Signed in
            var user = userCredential.user.uid;
            // ...
            //fill the information from the database
            const ref = db.collection(user);
            const snapshot = await ref.get();
            snapshot.forEach(doc => {
                if(doc.id === "Information")
                {
                    const Cost = doc.data().cost;
                    const Slots = doc.data().slots;
                    const Name = doc.data().name;
                    this.setState({cost : Cost});
                    this.setState({slots: Slots});
                    this.setState({name: Name});
                }
            })
            this.setState({uid: user});
            this.setState({status:"logged"})
        })
        .catch((error) => {
            if (
                error.code === "auth/invalid-email" ||
                error.code === "auth/user-not-found"
              ) {
                window.alert("User not found");
              } else if (error.code === "auth/wrong-password") {
                window.alert("Wrong password");
              }
              this.setState({status:"login"});
        });
    }
    checkStatus() 
    { 
        if (this.state.status === "login") 
        { 
            return (
            <div>
                <div style={{textAlign:"center"}}>
                    <a href="#"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                </div>
                <div class = "container">
                    <div style={{paddingTop:"5%"}}></div>
                    <div class = "text-center">
                    <h1 class = "title">Admin Login</h1>
                    <main class="form-signin">
                        <form>
                            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                            <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name = "email" onChange = {this.email}/>
                            <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name = "password" onChange = {this.password}/>
                            <label for="floatingPassword">Password</label>
                            </div>
                            
                           
                        </form>
                    </main>
                    <button class="button1" type="submit" onClick = {this.login}>Sign in</button>{"  "}<button class = "button2" onClick = {this.register}>Register</button>
                    <br/>
                    <br/>
                    <button style = {{width:"300px", height: "50px", border:"none", borderRadius:"5%"}} onClick = {(e) => {this.setState({status:"back"})}}>Go Back</button>
                    <p class="mt-5 mb-3 text-muted" style={{fontSize:"1rem"}}>&copyright; 2021–2022</p>
                    </div>
                    
                </div>
            </div>
            ) 
        }
        if(this.state.status === "loading")
        {
            return (
                <div>
                    <div style={{textAlign:"center"}}>
                        <a href="#"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div class = "container">
                        <div style={{paddingTop:"5%"}}></div>
                        <div class = "text-center">
                        <h1 class = "title">Admin Login</h1>
                        <main class="form-signin">
                            <form>
                                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
                                <div class="form-floating">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name = "email" onChange = {this.email}/>
                                <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name = "password" onChange = {this.password}/>
                                <label for="floatingPassword">Password</label>
                                </div>
                                
                               
                            </form>
                        </main>
                        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
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
        if(this.state.status === "logged")
        {
            return <Profile uid = {this.state.uid} name = {this.state.name} slots = {this.state.slots} cost = {this.state.cost}/>
        }
        if(this.state.status === "back")
        {
            return <Home/>
        }
    } 
    render() { 
        return this.checkStatus(); 
    } 
} 
export default ALogin;