import express from "express";
const router = express.Router();
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Credentials");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8) ;

        OriginalPassword !== req.body.password && res.status(401).json("Wrong Credentials");

        const accessToken = jwt.sign(
            { 
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {expiresIn: "3d"}
       );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });

    }catch(err) {
        res.status(500).json(err)
    }
})





export default router;