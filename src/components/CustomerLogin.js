import React from 'react';
import './styles.css';
import {db} from '../firebase/firebase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Assigned from './Assigned';
import CEntry from './CustomerEntry';
import Home from './Home';
class CLogin extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status : "home",
            regNo: "",
            password : "",
            parkId: "",
            slot: "",
        }
        this.checkStatus = this.checkStatus.bind(this);
        this.reg = this.reg.bind(this);
        this.password = this.password.bind(this);
        this.parkId = this.parkId.bind(this);
        this.assign = this.assign.bind(this);
        this.register = this.register.bind(this);
    }

    register(e)
    {
        this.setState({status: "register"});
    }
    async assign(e)
    {
        this.setState({status: "loading"});
        var reg = "", pass = "";
        const ref = db.collection(this.state.parkId).doc('Information').collection('Users');
        const snap1 = await ref.get();
        var slot;
        snap1.forEach((doc) => {
            if(doc.id === this.state.regNo)
            {
                reg = doc.id;
                pass = doc.data().password;
                slot = doc.data().slot;
            }
        });
        console.log(reg + " " + pass);
        if(reg == "")
        {
            window.alert("User not found");
            this.setState({status: "home"});
            return;
        }
        if(pass != this.state.password)
        {
            window.alert("Wrong credentials");
            this.setState({status: "home"});
            return;
        }
        //find the slots
        this.setState({slot: slot});
        this.setState({status: "added"});
    }
    reg(e)
    {
        this.setState({regNo: e.target.value});
    }
    password(e)
    {
        this.setState({password: e.target.value});
    }
    parkId(e)
    {
        this.setState({parkId: e.target.value});
    }
    checkStatus()
    {
        if(this.state.status === "home")
        {
            return (
                <div>
                    <div style = {{textAlign:"center"}}>
                        <a href="#"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div style = {{paddingTop:"2%"}}></div>
                    <div class = "container">
                        <div style = {{textAlign:"center"}}>

                        </div>
                        <div style = {{textAlign:"center"}}>
                            <h1>Please fill in the information</h1>
                        <main class="form-signin">
                        <form>

                            <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="XX XX XX XXXX" name = "email" onChange = {this.reg}/>
                            <label for="floatingInput">Reg.No</label>
                            </div>
                            <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name = "password" onChange = {this.password}/>
                            <label for="floatingPassword">Password</label>
                            </div>
                            <div class="form-floating">
                            <input type="parkId" class="form-control" id="floatingInput" placeholder="Parking id" name = "parkId" onChange = {this.parkId}/>
                            <label for="floatingPassword">Enter the parking id:</label>
                            </div>
                        </form>
                    </main>
                    <button class="button1" type="submit" onClick = {this.assign}>Proceed</button>{ "  " }<button class = "button2" onClick = {this.register}>Sign up</button>
                    <br/><br/>
                    <button style = {{width:"300px", height: "50px", border:"none", borderRadius:"5%"}} onClick = {(e) => {this.setState({status:"back"})}}>Go Back</button>
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.status === "loading")
        {
            return (
                <div>
                    <div style = {{textAlign:"center"}}>
                        <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div style = {{paddingTop:"2%"}}></div>
                    <div class = "container">
                        <div style = {{textAlign:"center"}}>

                        </div>
                        <div style = {{textAlign:"center"}}>
                            <h1>Please fill in the information</h1>
                        <main class="form-signin">
                        <form>

                            <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="XX XX XX XXXX" name = "email" onChange = {this.reg}/>
                            <label for="floatingInput">Reg.No</label>
                            </div>
                            <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name = "password" onChange = {this.password}/>
                            <label for="floatingPassword">Password</label>
                            </div>
                            <div class="form-floating">
                            <input type="parkId" class="form-control" id="floatingInput" placeholder="Parking id" name = "parkId" onChange = {this.parkId}/>
                            <label for="floatingPassword">Enter the parking id:</label>
                            </div>
                        </form>
                    </main>
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.status === "added")
        {
            return <Assigned parkId = {this.state.parkId} regNo = {this.state.regNo} slot = {this.state.slot}/>
        }
        if(this.state.status === "register")
        {
            return <CEntry/>
        }
        if(this.state.status === "back")
        {
            return <Home/>
        }
    }
    render()
    {
        return this.checkStatus();
    }
}
export default CLogin;