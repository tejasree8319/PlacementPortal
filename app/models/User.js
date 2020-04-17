const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const userSchema = new Schema(
  {
    userId: { type: String, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods = {
  // Generating jwt after creating a user and after login
  async generateAuthToken() {
    const token = jwt.sign(
      { _id: this._id.toHexString(), userId: this.userId },
      'tokencode',
      {
        expiresIn: '30d',
      }
    );

    await this.updateOne({
      $push: {
        tokens: token,
      },
    });
    return token;
  },
  removeUnwantedFields() {
    return _.omit(this.toObject(), [
      'password',
      '__v',
      'createdAt',
      'updatedAt',
    ]);
  },
};

userSchema.statics = {
  async findByCredentials(userId, password) {
    const user = await this.findOne({ userId });
    if (!user) {
      throw 'User not found';
    }
    // Use bcrypt.compare to compare password and user.password
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw 'Incorrect Password';
  },
};

//hashing a password before saving it to the database
console.log('Hash');

userSchema.pre('save', function (next) {
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

module.exports = mongoose.model('User', userSchema);
