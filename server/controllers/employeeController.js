import User from "../models/User";

const addEmployee = async (req, res) => {
      const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
      } = req.body;

      const user = await User.findOne({ email})
      if(user){
            return res.status(400).json({success: false, error: "user already registered in employee"})
      }

      const hashPassword = await bcrypt.hash(password,10)

      const 
}

export {addEmployee}