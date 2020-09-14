let messageModel = require('../models/message');

exports.create = (req,res,next) => {
    messageModel.create({user:req.user.id , guestBook:req.body.guestBook,text:req.body.text})
    .then(message => {
        res.status(200).send(message);
    }).catch(err => next(err));
};

exports.update = (req,res,next) => {
    messageModel.updateMessage(req.body.messageId,req.user.id,req.body.text)
    .then(message => {
        if(message){
            res.status(200).send(message);
        }
        else{
            res.status(200).send({notAuth:true});
        }
    }).catch(err => next(err));
};


exports.delete = (req,res,next) => {
    messageModel.deleteMessage(req.params.id)
    .then(message => {
        res.status(200).send({isDeleted:true,message:message});
    }).catch(err => next(err));
};

exports.showAllGuestBookMessages = (req,res,next) => {
    messageModel.findAllMessages(req.params.guestBookId).then(messages => {
        res.status(200).send(messages);
    }).catch(err => next(err));
};


exports.reply = (req,res,next) => {
    messageModel.addComment(req.body.messageId,req.user.id,req.body.text)
    .then(message => {
        res.status(200).send(message);
    }).catch(err => next(err));
};