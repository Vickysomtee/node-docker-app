const {Schema, model} = require('mongoose');

const bcrypt = require('bcrypt')
const saltRounds = 12


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
})

// hash user password before saving into database
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const users = model("Users", UserSchema);

module.exports = users;