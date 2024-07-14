const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
require("dotenv").config();

// Define Zod schemas
const signUpSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string().nonempty("Role is required"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
//signup
exports.signUp = async (req, res) => {
  try {
    //data fetch from  req ki body
    const parsedData = signUpSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        errors: parsedData.error.errors,
      });
    }

    const { firstName, lastName, email, password, role } = parsedData.data;

    //validate the user

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(404).json({
        success: false,
        // display firstname lastname email password role
        msg2: firstName,
        msg3: lastName,
        msg4: email,
        msg5: password,
        msg6: role,

        message: "All fields is required !!!!this is issue  ",
      });
    }

    //check user already exists or not
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({
        success: false,
        message: "Email is already in registered",
      });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //entry in the db

    const userinfo = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      role: role,
    });
    //return res
    return res.status(200).json({
      success: true,
      user: userinfo,
      message: "new user registered Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
      message:
        "Internal Server Error,User cannot be registered , please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //get data from req body
    // const { email, password } = req.body;
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        errors: parsedData.error.errors,
      });
    }

    const { email, password } = parsedData.data;
    //validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "AlL fields are required",
      });
    }
    //user check exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }
    //password match
    //generate JWT
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};
