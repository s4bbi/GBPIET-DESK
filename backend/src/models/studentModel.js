const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
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
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
  department: {
    type: String,
    enum: ["CSE", "ECE", "ME", "CE", "CSE (AIML)", "EE", "BT"],
    required: true,
  },
  year: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
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
const Student = mongoose.model("User", StudentSchema);
module.exports = Student;
