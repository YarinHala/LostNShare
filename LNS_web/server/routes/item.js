const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const User      = require('../models/User'); 
const bcrypt    = require('bcryptjs');

//login page
router.get('/lostform', (req,res) =>res.render('lostform'));

//foundform
router.get('/foundform', (req,res) => res.render('foundform'));

//hendel register
router.post('/register', (req,res) => {
    const {name, email, password, password2 } = req.body;
    let errors = [];

    //validate fields
    if( !name || !email || !password || !password2)
        errors.push({ msg: 'please fill all the fields'});
    
    //check password match
    if(password !== password2)
        errors.push({ msg: 'passwords do not match'});
        
    //check password length    
    if(password.length < 5)
        errors.push({ msg : 'password must be at least 5 charecters'});

    //validetion fail
    if(errors.length > 0){
        res.render('register',{
            errors : errors ,
            name : name,
            email : email,
            password : password,
            password2 : password2 
        });
    }
    //validetion passes
    else{
        User.findOne({email : email })
            .then(user =>{
                if(user){
                    // email exist
                    errors.push({msg : 'email allredy registerd'});
                    res.render('register',{
                        errors : errors ,
                        name : name,
                        email : email,
                        password : password,
                        password2 : password2
                        });
                }
                else{
                    let newuser = new User({
                        errors : errors ,
                        name : name,
                        email : email,
                        password : password
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newuser.password, salt, (err, hash) => {
                          if (err) throw err;
                          newuser.password = hash;
                          newuser.save()
                            .then(user => {
                              res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                        });
                      });    

                }
            });
    }

});

//login handel

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
module.exports = router;