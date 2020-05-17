const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema

const userSchema = new schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

});

const User = module.exports = mongoose.model('User', userSchema);
module.exports.saveUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash; //equal hash pw to users password
            if (err) throw err;
            else
                newUser.save(callback)
        });
    });

};

module.exports.findByEmail = function (email, callback) {
    const query = { email: email };
    User.findOne(query, callback);
}

module.exports.passwordCheck = function (plainpassword,hash,callback) {
    // Load hash from your password DB.
    bcrypt.compare(plainpassword, hash, function (err,res){
     if(err) throw err;
     if(res){
         callback(null,res);
     }else{
        callback(null,false)
    }
        
        // true

    });

};

module.exports.findUserById = function (id,callback){
    User.findOne(id,callback);

};