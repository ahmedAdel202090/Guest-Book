let mongoose = require('mongoose');


//building model
const model = mongoose.model('message', new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    guestBook:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'guestBook'
    },
    text:{
        type:String,
        required:true
    },
    comments:[{
        text:{
            type:String,
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    }]
},{
    collection: 'message',
    timestamps: true
}));


//queries on model

exports.create = (data) => {
    return model.create(data).then(result => result.populate('guestBook user comments.user').execPopulate());
};

exports.findAllMessages = (guestBookId) => {
    return model.find({guestBook:guestBookId}).populate('guestBook user comments.user').exec();
};

exports.deleteMessage = (id) => {
    return model.findByIdAndDelete(id).exec();
};

exports.updateMessage = (id,userId,text) => {
    return model.findById(id).then(message => {
        if(message && userId == message.user){
            message.text = text;
            message.save();
            return message;
        }
        else{
            return null;
        }
    });
};

exports.addComment = (messageId,userId,text) => {
    return model.findById(messageId).then(message=>{
        if(message){
            message.comments.push({text:text,user:userId});
            message.save();
            return message.populate('guestBook user comments.user').execPopulate();
        }
        else{
            return null;
        }
    });
}


