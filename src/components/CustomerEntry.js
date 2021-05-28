import React from 'react';
import './styles.css';
import {db} from '../firebase/firebase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Heap from '../DS/Heap';
import Assigned from './Assigned';
import CLogin from './CustomerLogin';
import Home from './Home';
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
            slot: "",
        }
        this.checkStatus = this.checkStatus.bind(this);
        this.reg = this.reg.bind(this);
        this.password = this.password.bind(this);
        this.parkId = this.parkId.bind(this);
        this.assign = this.assign.bind(this);
        this.login = this.login.bind(this);
    }
    login(e)
    {
        e.preventDefault();
        this.setState({status: 'login'});
    }
    async assign(e)
    {
        this.setState({status: "loading"});
        //check if the user exists already or not 
        const ref3 = db.collection(this.state.parkId).doc('Information').collection('Users');
        var reg = "";
        const snap5 = await ref3.get();
        snap5.forEach((doc) => {
            if(this.state.regNo === doc.id)
            {
                reg = doc.id;
            }
        })
        if(reg != "")
        {
            window.alert("User exists");
            this.setState({status: "home"});
            return;
        }
        Heap.refresh();
        //find all the slots available from the databse 
        const ref = db.collection(this.state.parkId).doc('Information').collection('Slots');
        const snapshot = await ref.get();
        let count = 0;
        snapshot.forEach((doc) => {
            // console.log(doc.id + " => " + doc.data())
            //add all the data in the heap 
            Heap.insert(Number(doc.id));
            count++;
        })
        if(count == 0)
        {
            window.alert("All the parking slots are full!");
            this.setState({status: "home"});
            return;
        }
        let x = Heap.getMin();
        this.setState({slot: x});
        let selectedId = String(x);
        //delete the document from firestore 
        const res = await db.collection(this.state.parkId).doc('Information').collection('Slots').doc(selectedId).delete();
        //add the data of the user in a user subcollection 
        const user = {
            regNo: this.state.regNo, 
            password: this.state.password, 
            slot: x,
            inTime : new Date()
        };
        //find the current number of users in  a day 
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        var today = new Date();
        var count1 = 0;
        var docId = String(monthNames[today.getMonth()] +  " " + today.getDate());
        const ref6 = db.collection(this.state.parkId).doc('Information').collection('Dates');
        const snapshot1 = await ref6.get();
        snapshot1.forEach((doc) => {
            if(doc.id === docId)
            {
                count1 = doc.data().count;
            }
        });
        count1 = count1 + 1;
        const d = {
            count: count1,
        }
        const res6 = db.collection(this.state.parkId).doc('Information').collection('Dates').doc(docId).set(d);
        const res1 = await db.collection(this.state.parkId).doc('Information').collection('Users').doc(this.state.regNo).set(user);
        this.setState({status:"added"});
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
                    <button class="button1" type="submit" onClick = {this.assign}>Proceed</button>{ "  " }<button class = "button2" onClick = {this.login}>Login</button>
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
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.status === "login")
        {
            return <CLogin/>
        }
        if(this.state.status === "added")
        {
            return <Assigned parkId = {this.state.parkId} regNo = {this.state.regNo} slot = {this.state.slot}/>
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
export default CEntry;