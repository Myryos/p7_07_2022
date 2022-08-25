
const user = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const owasp = require('owasp-password-strength-test');
const dotenv = require('dotenv').config() 

//Config le modul owasp possiblement a deplace dans un fichiier specifiique

//owasp.config(process.env.CONFIG)
owasp.config({
    allowPassphrases       : false,
    maxLength              : 25,
    minLength              : 8,
    minPhraseLength        : 20,
    minOptionalTestsToPass : 4,
})

exports.signup = (req, res) => {
    const result = owasp.test(req.body.password)
    let strong = "";
    if(!result.strong)
        strong = "Not Strong Enougth"
    if(result.strong && result.errors.length == 0)
    {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const User = new user({
                email : req.body.email,
                password: hash,
                refreshToken: '',
                roles:[255]
            });
            User.save()
                .then(() => {
                    res.status(201).json({message: 'Utilisateur cree !'})
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json(console.log({error})))
    }
    else
        res.status(400).json({error: result.errors + ',' + strong})
    
};

exports.login = (req, res) => {
    console.log(req.body.password)
    const mail = req.body.email
    user.findOne({email:  mail}, (error, userFound) => {
        if(error)
        {
            res.status(400).json({error: error, });
        }
        bcrypt.compare(req.body.password, userFound.password, (error, valid) => {
            if(error || !valid)
                res.status(400).json({error: error})
            if(valid)
            {
                console.log(valid)
                accessToken = jwt.sign(
                {userId: userFound._id},
                process.env.ACCESS_TOKEN_SECRET, //Devrais etre mis dans une variables .env
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}//Devrais etre mis dans une variables .env
            )
            res.json({ accessToken: accessToken})
        }

           
            
            /*user.findOneAndUpdate(
                {_id : userFound._id}, 
                {refreshToken: refreshToken}, 
                (error, updated) => {
                    if(error)
                    {
                        res.status(400).json({error: error})
                    }
                    if(updated)
                    {
                        
                    }
            })*/
        })
    })
};


exports.refreshMyToken = (req, res) => {
    if(!req.cookies.jwt) return res.status(401)
    const refreshToken = req.cookies.jwt
    user.findOne({refreshToken: refreshToken}, (error, userFound) => {
        if(!userFound) return res.status(403)
        if(userFound)
        {
            jwt.verify(
                refreshToken, 
                process.env.REFRESH_TOKEN_SECRET, 
                (error, decoded) => {
                    const newAccessToken = jwt.sign(
                    {email : decoded.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: process.env.ACCESS_TOKEN_EXPIRE})
                res.json({accessToken: newAccessToken})
            })
            if(error)
            {
                res.status(400).jsom({error : error})
            }
        }
    })
}