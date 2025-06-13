import User from "../model/Register.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authcontroller = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).send("Invalid credentials");
          }
          const ismatch = await bcrypt.compare(password, user.password);
          if (!ismatch) {
            return res.status(401).send("Invalid password");
          }
          // res.send(user);
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              role:user.role,
            },
            process.env.JWT,
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.status(200).json({
            status: "succes",
            message: "Login success",
            data: user,
            role:user.role
          });
        } catch (err) {
          res.status(500).send("something went wrong");
        }
      },
    
    logincheck: async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
          return res.status(401).json({
            message: "Access Denied. No token provided",
          });
        }
        try {
          const decoded = jwt.verify(token, process.env.JWT);
          req.user = decoded;
          next();
        } catch (err) {
          return res.status(400).json({
            message: "Invalid token",
          });
        }
      },
    
    logout: async(req,res)=>{
        res.clearCookie("token")
        res.status(200).json({
            message:"Logged out successfully"
        });
      },

}
export default authcontroller;
