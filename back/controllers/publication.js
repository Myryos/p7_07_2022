const Publication = require('../models/publication.js')
const User = require('../models/user.js')
const fs = require('fs')
const user = require('../models/user.js')


exports.newPublication = (req,res) => {
    const newPubli = req.body
    delete newPubli._id
    delete newPubli.userId;

    const publi = new Publication({
        ...newPubli,
        urlImg : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes: 0,
        userId : req.auth.userId, 
    })

    publi.save()
    .then(() => {res.status(201).json({message: 'Publication creer !'})}) // Verifier es code status
    .catch((error) => {res.status(400).json({ error })})
}

exports.likeHandler = (req, res) => {
    Publication.findById(req.params.id)
    .then((publi) =>
        {

            if(req.body.like == 1){
                    
               publi.usersLiked.push(req.auth.userId)
               publi.likes++; 
            }
            if(req.body.like == 0){
            
                if(publi.usersLiked.indexOf(req.auth.userId) != -1) //Si Il est deja present dans l'array
                {
                   publi.usersLiked.splice(publi.usersLiked.indexOf(req.auth.userId),1)
                   publi.likes = publi.usersLiked.length;
                    if(publi.likes < 0)
                       publi.likes = 0;
                }
                
                if(publi.usersDisliked.indexOf(req.auth.userId) != -1){
                    //Alors tu efface
                    
                    publi.usersDisliked.splice(sauce.usersLiked.indexOf(req.auth.userId), 1)
                    publi.dislikes =publi.usersDisliked.length;
                    if (sauce.dislikes < 0)
                       publi.dislikes = 0;
                }
            }
            if(req.body.like == -1)
            {
                publi.usersDisliked.push(req.auth.userId)
                publi.dislikes++;
                //tu le rajoute dans dislikes
            }

            publi.save()
            .then(res.status(200).json({message: "Modification effectuer"}))
            .catch((error) => {res.status(400).json({error})})  
        },
        // En fonction du status like changer la valeur de like et dislike.
    )
    .catch((error) => {res.status(404).json({error})})

}

exports.getAll = (req, res) =>  {
    Publication.find()
    .then(
        (allPubli) => {
            const arrayPubli = allPubli.reverse().map((publi) => {
                return publi;
            })
            res.status(200).json(arrayPubli);
        }
    )
    .catch(
        (error) => {
            res.status(404).json({error: error});
        })
}

exports.getOne = (req, res) => {
   
    Publication.findById(req.params.id).then(
        (publi) => {
            res.status(200).json(publi);
        }
    ).catch( (error) => {
        res.status(404).json({error: error});
    })
}

exports.modifyOne = (req, res) => {
    const publiObject = req.file ? {
        ...req.body,
        urlImg: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}
    delete publiObject._userId
    User.findOne({userId: req.auth.userId})
    .then((user) => {
        Publication.findOne({_id: req.params.id})
        .then((publi) => {
            console.log(`first test : ${publi.userId == req.auth.userId }, resultat attendu : `)
            console.log(`seconde test : ${user.role == process.env.ROLE_ADMIN}, resultat attendu : `)
            console.log(`all test : ${publi.userId == req.auth.userId || user.role == process.env.ROLE_ADMIN}, resultat attendu : `)
            if(publi.userId == req.auth.userId || user.role == process.env.ROLE_ADMIN)
            {
                const fn = publi.urlImg.split('/images/')[1]
                fs.unlink(`images/${fn}`, () =>{
                    Publication.updateOne({_id : req.params.id, userId: req.auth.userId}, {...publiObject, _id: req.params.id})
                .then(() => 
                {
                    res.status(200).json({message: 'Publication modifier'})
                })
                .catch((error) => 
                {
                    res.status(401).json({error})
                })
                })
            }
            else
            {
                res.status(403).json({message:'Not Authorized'})
            }
           
        })
        .catch(() => res.status(404).json({message: "Object Not Found"}))

    })
    .catch(error => res.status(404).json({error: error, message: 'User Not Found'}))
}

exports.deleteOne = (req, res) => {
    console.log(req.auth.userId)
    User.findOne({userId: req.auth.userId})
    .then((user) => {
        Publication.findOne({_id: req.params.id})
        .then(publi => {
            console.log(`first test : ${publi.userId == req.auth.userId }, resultat attendu : FALSE`)
            console.log(`seconde test : ${user.role == process.env.ROLE_ADMIN}, resultat attendu : TRUE`)
            console.log(`all test : ${publi.userId == req.auth.userId || user.role == process.env.ROLE_ADMIN}, resultat attendu : TRUE`)
            if(publi.userId == req.auth.userId || user.role == process.env.ROLE_ADMIN)
            {
                const filename = publi.urlImg.split('/images/')[1];
            
                fs.unlink(`images/${filename}`, () => {
                    
                    Publication.deleteOne({_id: req.params.id})
                    .then(() => {
                        
                        res.status(200).json({message: 'Publication Supprime'})})
                    .catch((error) => {
                    
                        res.status(401).json({error})})
                })
            }
            else
            {
                return res.status(403).json({message: "Not Authorized"});
            }
        })
        .catch(error => {res.status(404).json({error: error, message: 'Not Found'})});
        })
    .catch(error => {res.status(404).json({error: error, message: 'User Not Found'})})
    
    
}