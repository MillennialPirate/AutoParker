const router = require('express').Router();
const auth = require('../middleware/auth');
const Register = require('../services/CustomerAuthentication').Register;
const Login = require('../services/CustomerAuthentication').Login;

router.route('/CreateProfile').post(async(req, res) => {
    const {email, password, RegNo, role} = req.body;
    var obj = await Register(email, password, role, RegNo);
    if(obj.customer){
        res.cookie("jwtoken", obj.customer.token, {
            expires: new Date(Date.now() + 25892000000), 
            httpOnly : true
        });
    }
    res.status(200).json(obj.customer);  
}); 

router.route('/Login').post(async(req, res) => {
    const {RegNo, password} = req.body; 
    var obj = await Login(RegNo, password);
    if(obj.customer){
        res.cookie("jwtoken", obj.customer.token, {
            expires: new Date(Date.now() + 25892000000), 
            httpOnly : true
        });
    }
    res.status(200).json(obj);
})
router.route('/Welcome').get(auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});


module.exports = router;