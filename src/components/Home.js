import React from 'react';
import './styles.css';
import Car from './images/car.svg';
import Alogin from './AdminLogin';
class Home extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: "home"
        }
        this.checkStatus = this.checkStatus.bind(this);
        this.admin = this.admin.bind(this);
        this.customer = this.customer.bind(this);
    }
    admin(e)
    {
        e.preventDefault();
        this.setState({status: "admin"});
    }
    customer(e)
    {
        e.preventDefault();
        this.setState({status: "customer"});
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
                    <div class = "container">
                        <div class = "row" style={{textAlign:"center"}}>
                            <div class = "col-lg-12 col-md-12">
                                <img src = {Car} class = "side"/>
                            </div>
                            <div class = "col-lg-12 col-md-12" style={{textAlign:"center"}}>
                                <h1>Welcome to AutoParker</h1>
                                <p>Get your parkings automated with ease!!</p>
                                <p>Who are you?</p>
                                <button class = "button1" onClick = {this.admin}>Admin</button> {"    "} <button class = "button2" onClick = {this.customer}>Customer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.status === "admin")
        {
            return <Alogin/>
        }
    }
    render()
    {
        return this.checkStatus();
    }
}
export default Home;