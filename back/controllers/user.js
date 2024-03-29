
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
                role: 255
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
    const mail = req.body.email
    user.findOne({email:  mail}, (error, userFound) => {
        if(error)
        {
            console.log('error #1 : ' + error)
            return res.status(401).json({message: 'Paire login/Mot de passe est incorrect'})
        }
        if(userFound)
        {
            bcrypt.compare(req.body.password, userFound.password, (error, valid) => {
                if(error || !valid)
                {
                    console.log('error #2 : ' + error)
                    return res.status(401).json({message: 'Paire login/Mot de passe est incorrect'})
                }
                if(valid)
                {
                    accessToken = jwt.sign(
                    {userId: userFound._id,
                    role: userFound.role},
                    process.env.ACCESS_TOKEN_SECRET, 
                    {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}
                )
                res.json({ accessToken: accessToken })
            }
            })
        }
    })
};