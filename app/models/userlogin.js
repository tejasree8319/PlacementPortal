const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const _=require('lodash');

const userLoginSchema = new Schema({
    userId:{type: String, unique : true},
    password: {type :String,required :true},
    userType: {type :String,required :true}
});

userLoginSchema.methods = {
    // Generating jwt after creating a user and after login
    async generateAuthToken() {
      const token = jwt.sign({ _id: this._id.toHexString(), userId: this.userId }, "tokencode", {
        expiresIn: '30d'
      });
  
      await this.updateOne({
        $push: {
          tokens: token
        }
      });
      return token;
    },
    removeUnwantedFields() {
      return _.omit(this.toObject(), ['password', 'tokens', '__v']);
    }
  };

  
//hashing a password before saving it to the database
console.log("Hash");

userLoginSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });
  
  


module.exports=mongoose.model('UserLogin',userLoginSchema);
