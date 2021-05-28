import React from 'react';
import './styles.css';
import {db} from '../firebase/firebase';
import Home from './Home';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import RazorPanel from './Razorpanel';
import Pic from './images/pay.svg';
class Assigned extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: "home",
            slot: this.props.slot,
            regNo : this.props.regNo,
            parkId: this.props.parkId,
            cost: 0,
            amount: 0
        };
        this.checkStatus = this.checkStatus.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }
    checkOut(e)
    {
        e.preventDefault();
        this.setState({status: "pay"});
    }
    async componentDidMount()
    {
        //take the in time and cost from the database
        //cost 
        var cost = 0;
        const ref1 = db.collection(this.state.parkId);
        const snap1 = await ref1.get();
        snap1.forEach((doc) => {
            if(doc.id === "Information")
            {
                cost = doc.data().cost;
            }
        });
        console.log(cost);
        this.setState({cost: cost});
        //taking the intime 
        var inTime;
        const ref2 = db.collection(this.state.parkId).doc('Information').collection('Users');
        const snap2 = await ref2.get();
        snap2.forEach((doc) => {
            if(doc.id === String(this.state.regNo))
            {
                var timestamp = doc.data().inTime;
                inTime = (new Date(timestamp.seconds*1000 + timestamp.nanoseconds/100000)).getTime();
                console.log(inTime);
            }
        });
        var outTime = new Date().getTime();
        var dif = Math.floor((outTime - inTime)/(1000*60));
        console.log(dif);
        var amt = dif*cost;
        console.log(amt)
        this.setState({amount: amt});
        console.log(this.state.amount);
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
                    <div class = "container" style = {{paddingTop:"5%"}}>
                        <div class = "row">
                            <div class = "col-lg-6 col-md-12">
                                <div style = {{textAlign:"center"}}>
                                <h1>Your slot is: </h1>
                                </div>
                                <div>
                                <div class="quiz-container" id="quiz" style={{width:"50%", margin:"auto"}}>
                                <div class="quiz-header" style={{textAlign:"center"}}>
                                    <h1 style = {{fontSize:'11rem', fontWeight:"bolder"}}>{this.state.slot}</h1>
                                </div>
                                </div>
                                </div>
                                </div>
                                <div class = "col-lg-6 col-md-12">
                                <div style = {{textAlign:"center"}}>
                                <h1>Other information</h1>
                                </div>
                                <div>
                                <div class="quiz-container" id="quiz" style={{width:"100%", margin:"auto",  textAlign:"center"}}>
                                <div class="quiz-header">
                                    <h1 style = {{fontSize:'2rem', color:"#E50914"}}>Vehicle Registration Number : <span style = {{color:"black", fontSize:"1.5rem"}}>{this.state.regNo}</span></h1>
                                    <h1 style = {{fontSize:'2rem', color:"#E50914"}}>Parking space Id : <span style = {{color:"black", fontSize:"1.5rem"}}>{this.state.parkId}</span></h1>
                                    <button class ="button1" onClick = {this.checkOut}>Checkout!</button>{"  "}
                                    <button style = {{width:"150px", height: "50px", border:"none", borderRadius:"5%"}} onClick = {(e) => {this.setState({status:"back"})}}>Go Back</button>
                                </div>
                                </div>
                                </div>
                                </div>
                            </div>
                            
                            </div>
                        </div>
            )
        }

        if(this.state.status === "pay")
        {
            return (
                <div>
                    <div style = {{textAlign:"center"}}>
                        <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div class = "container" style={{textAlign:"center"}}>
                        <img src = {Pic} style={{height:"500px", width:"500px"}}/>
                    </div>
                    <div class = "container">
                        <div style = {{textAlign:"center"}}>
                            <h1 class = "title">Are you sure to checkout?</h1>
                            <RazorPanel price = {this.state.amount*100} parkId = {this.state.parkId} slot = {this.state.slot} regNo = {this.state.regNo}/><br/><br/><button class = "button2">Go back</button>
                        </div>
                    </div>
                </div>
            )
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
export default Assigned;