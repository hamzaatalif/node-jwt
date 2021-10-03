require("dotenv").config();
const CustomAPIError = require("../errors/custom-error")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomAPIError("Please provide username and password", 400)
    }
    const id = new Date().getDate();
    const token = jwt.sign({
        id,
        username
    }, process.env.JWT_SECRET, { expiresIn: "2h" })
    console.log(username, password)
    return res.status(200).json({ msg: "user created!", token });
}

const dashboard = async (req, res) => {
    if (!req.user) {
        throw new CustomAPIError("Please provide username and password", 400)
    }
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello ${req.user.username}!`, secret: `Here is your accessed data, your lucky number is: ${luckyNumber}` });
}

module.exports = {
    login,
    dashboard
}