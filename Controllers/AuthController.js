var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var userModel = require('../models/user');

const config = {
    secret: 'supersecret'
};


exports.register = (req,res,next) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    userModel.create({
        username:req.body.username
        ,password:hashedPassword,
        name:req.body.name
    }).then(user => {
        res.status(200).send(user);
    }).catch(err => next(new Error('user data not valid')));
}

exports.login = (req,res,next) => {
    userModel.findUser(req.body.username).then(user => {
        if(user == null) return res.status(500).send({ auth: false, message: 'username not exist' });
        let validPassword = bcrypt.compareSync(req.body.password,user.password); 
        if(!validPassword) return res.status(500).send({auth:false, message: 'password not valid' });
        let token = jwt.sign({username:user.username,id:user._id,name:user.name},config.secret,{expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token ,username:user.username,name:user.name,id:user._id});
    });
};
exports.verify = (req,res,next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user = decoded;
        return next();
    });  
};
exports.getLogedUser = (req,res,next) => {
    res.status(200).send({user:req.user});
}