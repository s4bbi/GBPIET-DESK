const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
        
    instituteId: {
      type: Number,
      required: [true, "Institute ID is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{7}$/.test(String(v)); // Ensures exactly 6 digits
        },
        message: "Institute ID must be a 7-digit number",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },

    department: {
      type: String,
      enum: ["CSE", "ECE", "ME", "CE", "CSE (AIML)", "EE", "BT","MCA"],
      required: true,
    },

    batch: {
      type: String,
      required: true,
    },

    cgpa: {
      type: Number,
      min: 0,
      max: 10,
      default: null, // or 0 if you prefer
    },

    skills: {
      type: [String],
      default:[],
    },

    achievements: {
      type: [String],
      default:[],
    },
    
    resume: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

StudentSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10  * 60 * 1000; // Token valid for 10 minutes
  return resetToken;
};

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
