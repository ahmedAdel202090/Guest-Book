let mongoose = require('mongoose');


//building model
const model = mongoose.model('guestBookUser', new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    guestBook:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'guestBook'
    }
},{
    collection: 'guestBookUser',
    timestamps: true
}));


//queries on model

exports.findJoinedGuestBooks = (userId) => {
    return model.find({user:userId}).populate('guestBook').lean().exec().then(result => {
        return result.map(element => {
            element.guestBook.isOwner = false;
            return element.guestBook;
        });
    });
};

exports.joinToGuestBook = (userId,guestBookId) => {
    return model.create({user:userId,guestBook:guestBookId});
}