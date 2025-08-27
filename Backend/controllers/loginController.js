import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import path from 'path';

const getLoginPage = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'login.html'));
};

const login =async(req, res) =>{
    const {email, password}=req.body;
    const user =await UserModel.findOne({email});
     try {
    if(!user){
          return res.status(400).json({message:"Invalid creddentials"})
    }

    const isMatch =await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid creddentials"});
    }

    const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET,          
            { expiresIn: '1h' }                
        );
    res.json({ token, role: user.role, name: user.name });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }


}

export {login, getLoginPage}