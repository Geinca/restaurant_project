import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc, role } = req.body;

        if (!role || (role !== 'customer' && role !== 'employee')) {
            return res.send({ "status": "failed", "message": "Invalid role provided" });
        }

        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.send({ "status": "failed", "message": "Email already exists" });
        } else {
            if (name && email && password && password_confirmation && tc && role) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            tc: tc,
                            role: role
                        });
                        await doc.save();
                        const saved_user = await UserModel.findOne({ email: email });

                        // jwt token
                        const token = jwt.sign({ userID: saved_user._id, role: saved_user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
                        res.status(201).send({ "status": "Success", "message": "Registration successful", "token": token });
                    } catch (error) {
                        console.log(error);
                        res.send({ "status": "failed", "message": "Unable to register" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "Password and Password Confirmation does not match !!" });
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required" });
            }
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email: email });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch) {
                        // jwt token generate
                        const token = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
                        res.send({ "status": "Success", "message": "Login successfully", "token": token });
                    } else {
                        res.send({ "status": "failed", "message": "Password or Usermail does not matched!!" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "You are not registered user" });
                }
            } else {
                res.send({ "status": "failed", "message": "All fields required!!" });
            }
        } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "Unable to login!" });
        }
    }
}

export default UserController;
