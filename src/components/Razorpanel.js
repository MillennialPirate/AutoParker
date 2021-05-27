import React from 'react';
import {db} from '../firebase/firebase';
import Home from './Home';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
class RazorPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: "payment",
            slot: String(this.props.slot),
            parkId : this.props.parkId,
            regNo : this.props.regNo,
            price: this.props.price
        };
        this.openCheckout = this.openCheckout.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }
    openCheckout()
    {
        var parkId = this.state.parkId;
        var slot = this.state.slot;
        var price = this.state.price;
        var regNo = this.state.regNo
        let options = {
          "key": "rzp_test_myGwLTueUSTDxn",
          "amount": this.state.price, // 2000 paise = INR 20, amount in paisa
          "name": "AutoParker",
          "description": "Purchase Description",
          "image": "https://fontmeme.com/permalink/210525/a4aeb530976e0eb036bb6bf970abf2fb.png",
          "handler": async function (response) {
              //add the slot back in database 
            const data = {
                regNo : "",
            }
            const res1 = await db.collection(parkId).doc('Information').collection('Slots').doc(String(slot)).set(data);
            //remove the user from the users collection 
            const res2 = await db.collection(parkId).doc('Information').collection('Users').doc(regNo).delete();
            MySwal.fire({
                title: 'Payment suceessful',
                text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Proceed',
              }).then((result) => {
                if(result.isConfirmed)
                {
                  window.location.href = "www.google.com";
                }
              })
          },
          "prefill": {
            "name": "",
            "email": ""
          },
          "notes": {
            "address": "Hello World"
          },
          "theme": {
            "color": "#E50914"
          }
        };
    
        let rzp = new window.Razorpay(options);
        rzp.open();
    }
    checkStatus()
    {
        if(this.state.status === "payment")
        {
            <div>
                <button class="btn transparent" style={{ background: "#6CB4EE", height:"50px" }} id="rzp-button1" onClick={() => this.openCheckout()}>
                Pay
                </button>
            </div>
        }
    }
    render()
    {
        return <div>
        <button class="btn transparent" style={{ background: "#E50914",color:"white", height:"50px", width:"150px" }} id="rzp-button1" onClick={() => this.openCheckout()}>
        Pay
        </button>
    </div>      
    }
}
export default RazorPanel;