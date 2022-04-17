const router = require('express').Router();
const auth = require('../middleware/auth');
const Register = require('../services/Authentication').Register;
const Login = require('../services/Authentication').Login;

router.route('/CreateProfile').post(async(req, res) => {
    const {email, password, role} = req.body;
    var obj = await Register(email, password, role);
    if(obj.user){
        res.cookie("jwtoken", obj.user.token, {
            expires: new Date(Date.now() + 25892000000), 
            httpOnly : true
        });
    }
    res.status(200).json(obj.user);  
}); 

router.route('/Login').post(async(req, res) => {
    const {email, password} = req.body; 
    var obj = await Login(email, password);
    if(obj.user){
        res.cookie("jwtoken", obj.user.token, {
            expires: new Date(Date.now() + 25892000000), 
            httpOnly : true
        });
    }
    res.status(200).json(obj.user);
})
router.route('/Welcome').get(auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});


module.exports = router;