let guestBookModel = require('../models/guestBook');
let guestBookUsersModel = require('../models/guestBookUsers');
let userModel = require('../models/user');
exports.create = (req,res,next) => {
    guestBookModel.create({name:req.body.name,owner:req.user.id})
    .then(guestBook => {
        res.status(200).send(guestBook);
    }).catch(err => next(err));
};

exports.inviteUser = (req,res,next) => {
    userModel.findUser(req.body.username)
    .then(user => {
        if(user){
            guestBookUsersModel.joinToGuestBook(user._id,req.body.guestBookId)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => next(err));
        }
        else{
            res.status(200).send({notFound:true,message:'username not exist'});
        }
    }).catch(err => next(err));
};

exports.showAll = (req,res,next) => {
    const userId = req.user.id;
    Promise.all([
        guestBookModel.findOwneredGuestBooks(userId),
        guestBookUsersModel.findJoinedGuestBooks(userId)
    ]).then(([owneredGuestBooks,joinedGuestBooks]) => {
        let userGuestBooks = owneredGuestBooks.concat(joinedGuestBooks);
        res.status(200).send(userGuestBooks);
    });
};