let mongoose = require('mongoose');


//building model
const model = mongoose.model('guestBook', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    collection: 'guestBook',
    timestamps: true
}));


//queries on model

exports.create = (data) => {
    return model.create(data);
};

exports.findOne = (id) => {
    return model.findById(id);
};

exports.findOwneredGuestBooks = (userId) => {
    return model.find({owner:userId}).lean().then(result => result.map(element => {
        element.isOwner= true;
        return element;
    }));
};