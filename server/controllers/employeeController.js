import User from "../models/User.js";
import Employee from "../models/Employee.js";
import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";

const storage = multer.diskStorage({
      destination:(req, file, cb) =>{
            cb(null,"public/uploads")
      },
      filename : (req, file,cb) =>{
            cb(null, Date.now() + path.extname(file.originalname));
      }
});

const upload = multer({storage:storage})


const addEmployee = async (req, res) => {
      try {
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
            console.log(req.body);
      
            const user = await User.findOne({ email})
            if(user){
                  return res.status(400).json({success: false, error: "user already registered in employee"})
            }
      
            const hashPassword = await bcrypt.hash(password,10)
      
            const newUser = new User({
                  name,
                  email,
                  password: hashPassword,
                  role,
                  profileImage: req.file? req.file.filename : ""
            })
      
            const savedUser = await newUser.save();
      
            const newEmployee = new Employee({
                  userId: savedUser._id,
                  employeeId,
                  dob,
                  gender,
                  maritalStatus,
                  designation,
                  department,
                  salary,
            })
      
            await newEmployee.save();
            return res.status(200).json({success: true, message:"employee created"})
      } catch (error) {
            res.status(500).json({error: error, message :"server error in adding employee"})
      }
      
}

const getEmployees = async (req, res) => {
      try {
            const employees = await Employee.find().populate('userId', 'name');
            return res.status(200).json({success: true,employees})

      } catch (error) {
            res.status(500).json({error: error, message: "Get employee server error"});
      }
}

const editEmployee = async (req, res) => {
      try {
          const {id} = req.params;
          const department = await Department.findById({_id:id});
          return res.status(200).json({success: true, department})
      } catch (error) {
          return res.status(500).json({success:false, error: "edit department server error",});
      }
  }

export {addEmployee,upload, getEmployees, editEmployee}