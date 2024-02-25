const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://fury:mnm@cluster0.6lai5xn.mongodb.net/viewdetails", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// userSchema.static.isuerExists =async function(email){
//   if(!email) throw new Error('Invalid email')
//       try {
//         const user =  await this.findOne({email})
//       if(user) return false
//       return true
//       } catch (error) {
//          console.log(error.message);
//          return false
//       }
// }

// Define Model
const User = mongoose.model("User", userSchema);

module.exports = User;
