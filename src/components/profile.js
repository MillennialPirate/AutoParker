import React from 'react'; 
import './styles.css'; 
import Info from './Information';
import Photo from './images/parking.svg';
import Home from './Home';
import Dashboard from './Dashboard';
class Profile extends React.Component 
{ 
    constructor(props) 
    { 
        super(props); 
        console.log(props);
        this.state = 
        { 
            status: "home",
            uid: this.props.uid, 
            name: this.props.name, 
            slots: this.props.slots, 
            cost: this.props.cost
        } 
        this.checkStatus = this.checkStatus.bind(this); 
    } 
    checkStatus() 
    { 
        if(this.state.cost === 0 && this.state.slots === 0)
        {
            return <Info uid = {this.state.uid}/>
        }
        else 
        {
            if(this.state.status === "home")
            {
                
            return (
                <div> 
                    <div style = {{textAlign:"center"}}>
                        <a href="#"><img src="https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png" alt="netflix-font" border="0"/></a>
                    </div>
                    <div>
                        <div class = "container">
                            <div class = "row">
                                <div class = "col-lg-6 col-md-12" style={{textAlign:"center"}}>
                                    <div style={{paddingTop:"5%"}}></div>
                                    <h1 class = "title">Dashboard analytics:</h1>
                                <div class="quiz-container" id="quiz" style={{width:"75%", margin:"auto"}}>
                                        
                                        
                                        <Dashboard uid = {this.state.uid}/>
                                    </div>
                                </div>
                                <div class = "col-lg-6 col-md-12" style={{textAlign:"center"}}>
                                <div style={{paddingTop:"5%"}}></div>
                                    <div style={{textAlign:"center"}}>
                                        
                                    <h1 class = "title">Your info!</h1>
                                    </div>
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
                                        <button class = "button1" onClick = {(e) => {this.setState({status:"back"})}}>Go Back</button><br/><br/>
                                        
                                    </div>
                                    </div>
                                </div>
                            </div>
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
        
    } 
    render() 
    { 
        return this.checkStatus(); 
    } 
} 
export default Profile;