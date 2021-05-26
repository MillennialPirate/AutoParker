import React from 'react';
import './styles.css';
import {db} from '../firebase/firebase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Heap from './Heap';
class CEntry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status : "home",
            regNo: "",
            password : "",
            parkId: "",
        }
        this.checkStatus = this.checkStatus.bind(this);
        this.reg = this.reg.bind(this);
        this.password = this.password.bind(this);
        this.parkId = this.parkId.bind(this);
        this.proceed = this.proceed.bind(this);
        this.assign = this.assign.bind(this);
    }
    assign(e)
    {
        e.preventDefault();
        Heap.hello('Siddharth');
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
    proceed(e)
    {
        //save it to the respective collection 
        this.setState({status: "loading"});
        const data = {
            regNo : this.state.regNo, 
            password : this.state.password, 
            inTime : new Date(),
        }
        const ref = db.collection(this.state.parkId).doc('Information').collection('Users').doc(this.state.regNo).set(data);
        this.setState({status: "added"});
    }
    checkStatus()
    {
        if(this.state.status === "home")
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
                    <button class="button1" type="submit" onClick = {this.proceed}>Proceed</button>
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
            return (
                <div>
                    <h1>Added!!</h1>
                </div>
            )
        }
    }
    render()
    {
        return this.checkStatus();
    }
}
export default CEntry;