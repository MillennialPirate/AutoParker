import React from 'react';
import './styles.css'; 
import Park from './images/parking.svg';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Home from './Home';
import {db} from '../firebase/firebase';
class Info extends React.Component 
{ 
    constructor(props) 
    { 
        super(props); 
        this.state = 
        { 
            status: "home",
            uid: this.props.uid,
            cost: 0, 
            slots: 0,
            name: "",
        } 
        this.checkStatus = this.checkStatus.bind(this); 
        this.first = this.first.bind(this);
        this.second = this.second.bind(this);
        this.cost = this.cost.bind(this);
        this.slots = this.slots.bind(this);
        this.revise = this.revise.bind(this);
        this.third = this.third.bind(this);
        this.name = this.name.bind(this);
        this.save = this.save.bind(this);
    } 
    
    async save(e)
    {
        e.preventDefault();
        this.setState({status: "loading"});
        const data = {
            cost: this.state.cost, 
            slots: this.state.slots, 
            name: this.state.name,
            uid: this.state.uid,
        };
        var i = 0;
        for(i = 0; i < this.state.slots; i++)
        {
            const data = {
                regNo : "",
            }
            const res1 = await db.collection(this.state.uid).doc('Information').collection('Slots').doc(String(i)).set(data);
        }
        const res = await db.collection(this.state.uid).doc('Information').set(data);
        window.alert("Account created! Please login again to follow the next steps");
        this.setState({status: "home"});
    }
    name(e)
    {
        this.setState({name: e.target.value});
    }
    third(e)
    {
        e.preventDefault();
        this.setState({status: "third"});
    }
    revise(e)
    {
        e.preventDefault();
        this.setState({status: "finish"});
    }
    cost(e)
    {
        this.setState({cost: Number(e.target.value)});
    }
    slots(e)
    {
        this.setState({slots: Number(e.target.value)});
    }
    second(e)
    {
        e.preventDefault();
        this.setState({status: "second"});
    }
    first(e)
    {
        e.preventDefault();
        this.setState({status: "first"});
    }
    checkStatus() 
    { 
        if (this.state.status === "home") 
        { 
            return (
            <div> 
                <div style = {{textAlign:"center"}}>
                    <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                </div>
                <div style={{paddingTop:"2%"}}></div>
                <div class = "container" style={{textAlign:"center"}}>
                    <img src = {Park} class = "side"/>
                    <h1 class = "title">Welcome Admin</h1>
                    <p>Let's get to know about your parking space !</p>
                    <button class = "button1" onClick = {this.first}>Proceed!</button>
                </div>
            </div>
            ) 
        } 

        if(this.state.status === "first")
        {
            return (
                <div> 
                    <div style = {{textAlign:"center"}}>
                        <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div style={{paddingTop:"2%"}}></div>
                    <div class = "container" style={{textAlign:"center"}}>
                    <div class="quiz-container" id="quiz" style={{width:"75%", margin:"auto"}}>
                            <div class="quiz-header">
                                <h2 id="question">Enter the number of parking slots</h2>
                                <input type = "text" name = "slots" value = {this.state.slots} onChange = {this.slots}/>
                            </div>
                            <button id="submit" class="button1" style={{width:"100%"}} onClick = {this.second}>Next</button>
                    </div>
                    </div>
                </div>
                ) 
        }
        if(this.state.status === "second")
        {
            return (
                <div> 
                    <div style = {{textAlign:"center"}}>
                        <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div style={{paddingTop:"2%"}}></div>
                    <div class = "container" style={{textAlign:"center"}}>
                    <div class="quiz-container" id="quiz" style={{width:"75%", margin:"auto"}}>
                            <div class="quiz-header">
                                <h2 id="question">Enter the cost charged per minute</h2>
                                <input type = "text" name = "cost" value = {this.state.cost} onChange = {this.cost}/>
                            </div>
                            <button id="submit" class="button1" style={{width:"100%"}} onClick = {this.third}>Next</button>
                    </div>
                    </div>
                </div>
                ) 
        }
        if(this.state.status === "third")
        {
            return (
                <div> 
                    <div style = {{textAlign:"center"}}>
                        <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div style={{paddingTop:"2%"}}></div>
                    <div class = "container" style={{textAlign:"center"}}>
                    <div class="quiz-container" id="quiz" style={{width:"75%", margin:"auto"}}>
                            <div class="quiz-header">
                                <h2 id="question">Enter the name of your place:</h2>
                                <input type = "text" name = "name" value = {this.state.name} onChange = {this.name}/>
                            </div>
                            <button id="submit" class="button1" style={{width:"100%"}} onClick = {this.revise}>Next</button>
                    </div>
                    </div>
                </div>
                ) 
        }
        if(this.state.status === "finish")
        {
            return (
                <div> 
                    <div style = {{textAlign:"center"}}>
                        <a href="https://fontmeme.com/netflix-font/"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div style={{paddingTop:"2%"}}></div>
                    <div class = "container" style={{textAlign:"center"}}>
                    <div class="quiz-container" id="quiz" style={{width:"75%", margin:"auto"}}>
                        
                        <div >
                        <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Parking Space Id : {this.state.uid}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Total number of slots : {this.state.slots}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Cost charged per minute : ₹ {this.state.cost}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Name of the place : {this.state.name}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                        </div>
                        <button id="submit" class="button1" style={{width:"100%"}} onClick = {this.save}>Verified!</button>
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
                    <div style={{paddingTop:"2%"}}></div>
                    <div class = "container" style={{textAlign:"center"}}>
                    <div class="quiz-container" id="quiz" style={{width:"75%", margin:"auto"}}>
                        
                        <div >
                        <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Parking Space Id : {this.state.uid}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Total number of slots : {this.state.slots}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Cost charged per minute : ₹ {this.state.cost}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                            <div >
                                <h4 id="question">Name of the place : {this.state.name}</h4>
                            </div>
                            <div style={{paddingTop:"5%"}}></div>
                        </div>
                        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                    </div>
                    </div>
                </div>
                ) 
        }
        if(this.state.status === "home")
        {
            return <Home/>
        }
    } 
    render() { 
        return this.checkStatus(); 
    } 
} 
export default Info;