import User from "../models/User.js";
import  bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) =>{

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({success: false, error:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            res.status(404).json({success: false, error:"Wrong password"})
        }

        const token = jwt.sign(
            {_id: user._id, role: user.role},
            process.env.JWT_KEY,
            { expiresIn : "10d"}
        );

        res.status(200).json({
            success: true,
            token,
             user: {_id: user._id, role: user.name, role: user.role},

            });
    } catch (error) {
        res.status(500).json({success:false, error: error.message})
    }
}

// const verify = (req, res) => {
//     return res.status(200).json({success:true, user: req.user})
// };


const verify = (req, res) => {
    try {
      const user = req.user;  // This will come from the authMiddleware
      console.log('User data from middleware:', user);  // Log user data
  
      if (user) {
        return res.status(200).json({ success: true, user });
      } else {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
      }
    } catch (error) {
      console.error('Error in verify function:', error);  // Log any unexpected error
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  


export  { login, verify };