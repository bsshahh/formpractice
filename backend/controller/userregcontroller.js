import User from "../model/Register.js";


const userregcontroller = {
  createUser: async (req, res) => {
    try {
      const { firstname, lastname, email, password, mobile, role, admincode } = req.body;

      if(role==="admin"){
        console.log(admincode+" "+process.env.ADMIN_CODE);
        if(admincode!==process.env.ADMIN_CODE){
           return res.status(403).json({             
              message: "Invalid admin code",
            });
        }
      }
      const userDetails = await User.create({
        firstname,
        lastname,
        email,
        password,
        mobile,
        role
      });
      return res.status(201).json({
        status: "success",
        data: userDetails,
        message: "user registered",
      });
    
    } catch (err) {
      console.log(err);
    }
  
  },

  
  Alluser:async(req,res)=>{
    try{
          const users=await User.find({role:"user"}).select("-password");
          if(!users||users.length===0) return res.status(404).json({
            userDetails:[],
            message:"No user available"
          });
          return res.status(200).json({
            userDetails:users,
            message:"Users fetched "
          })
    }catch(err){
      console.log("error in fetch user",err);
        return res.status(500).json({
          message: "Internal server error",
        });
    }

  },
  deleteUser:async(req,res)=>{
   try{
    const userId=req.params.id;
    const duser=await User.findByIdAndDelete(userId);
    if(!duser){
      return res.status(404).json({
        message:"User not found"
      });
    }
    return res.status(200).json({
        message:"User deleted succussfully"
      });
   } catch(err){
      console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error while deleting user." });
   }

  },

  updateUser:async(req,res)=>{
    try{
      const userId=req.params.id;
      const { firstname, lastname,  mobile } = req.body;

      const updateuser=await User.findByIdAndUpdate(userId,{
        firstname,lastname,mobile
      });
      if(!updateuser) return res.status(404).json({
        message:"User not found"
      });
      return res.status(200).json({
        message:"User updated succussfully"
      });

    }catch(err){
      console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error while updating user." });
    }
  }

  // logout: async(req,res)=>{
  //   const userToken = req.cookies.token;
  //   console.log(userToken)
  //   res.cookie("token", "")

  //   return res.status(200).json({
  //     status:"success",
  //     message: "Logout succesfully"
  //   })
  // }
  

};
export default userregcontroller;
