import React from 'react';
import './styles.css';
import {db} from '../firebase/firebase';
import Home from './Home';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
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
        };
        this.checkStatus = this.checkStatus.bind(this);
        this.checkout = this.checkout.bind(this);
    }
    async checkout(e)
    {
        e.preventDefault();
        this.setState({status: "loading"})
        //add the slot back in database 
        const data = {
            regNo : "",
        }
        const res1 = await db.collection(this.state.parkId).doc('Information').collection('Slots').doc(String(this.state.slot)).set(data);
        //remove the user from the users collection 
        const res2 = await db.collection(this.state.parkId).doc('Information').collection('Users').doc(this.state.regNo).delete();
        this.setState({status: "deleted"});
        //include the payment featue
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
                                    <button class = "button1" onClick = {this.checkout}>Checkout</button>
                                </div>
                                </div>
                                </div>
                                </div>
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
                                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                                </div>
                                </div>
                                </div>
                                </div>
                            </div>
                            
                            </div>
                        </div>
            )
        }
        if(this.state.status === "deleted")
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