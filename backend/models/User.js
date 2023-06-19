const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username not provided"],
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: '{VALUE} is not a valid email!'
        }
    
      },
      role: {
        type: String,
        enum: ["normal", "admin"],
        required: [true, "Please specify user role"]
      },
      password: {
        type: String,
        required: true
      },
      isAuthenticated: {
        type: Boolean,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      },
      events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }],
      siteId: {
        type: String,
        required: false
      }
});

module.exports = mongoose.model('User', userSchema);