const User = require("../model/dbs");
const bcrypt = require('bcrypt');

module.exports.signdata = async (req, res) => {
  let userdata = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  try {
    const finduser = await User.findOne({ email: userdata.email });
    if (finduser) {
      return res.status(409).json({ message: "User already exists" }); 
    } else {
      const hashedPassword = await bcrypt.hash(userdata.password, 10);
      userdata.password = hashedPassword;
      await User.create(userdata);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.loginuser = async (req, res) => {
  let userlogindata = {
    email: req.body.email,
    password: req.body.password
  }
  try {
    const finduser = await User.findOne({ email: userlogindata.email });
    if (finduser) {
      const isPasswordMatch = await bcrypt.compare(userlogindata.password, finduser.password);
      if (isPasswordMatch) {
        res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.forpass = async(req,res)=>{
    let forpassbody = {
         email: req.body.email,
     }
     try {
     const finduser = await User.findOne({ email: forpassbody.email });

      if(finduser){
         res.status(200).json({message:"true"})
      }else{
        return res.status(500).json({message:'mail not found'})
      }
     } catch (error) {
       res.status(500).json({error:"server error"})
     }
}
module.exports.changepass = async(req,res)=>{
  let forpassbody = {
    email: req.body.email,
    password:req.body.password,
}
   try {
  const finduser = await User.findOne({ email: forpassbody.email });
   if(finduser){
    const hashedPassword = await bcrypt.hash(forpassbody.password, 10);
    forpassbody.password = hashedPassword
     await User.updateMany({email:forpassbody.email},{$set:{password:forpassbody.password}})
    return res.status(200).json({message:"password updated"})
   }else{
    res.status(500).json({message:"something wend wrong"})
   }
   } catch (error) {
      res.status(500).json({message:"internal server error"})
   }
}
