let mongoose = require('mongoose');

//building model
const model = mongoose.model('user', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    collection: 'user',
    timestamps: true
}));


//queries on model

exports.create = (data) => {
    return model.create(data);
};

exports.findUser = (username) => {
    return model.find({username:username}).then(result => result.length>0?result[0]:null);
}

