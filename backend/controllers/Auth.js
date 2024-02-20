const User = require("../model/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Review = require("../model/Review");
const Faculty = require("../model/Faculty");
const mongoose = require("mongoose");
const BlacklistedToken = require("../model/BlacklistedToken");

// define route handler

exports.signup = async(req, res) => {
    try {
        //extract firstName, lastName, email and password from body
        const {firstName, lastName, email, password, review} = req.body;
        // create the data in the db using .create({})


        let hashedPassword
        hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({firstName, lastName, email, password: hashedPassword, review})

        res.status(200).json({
            success: true,
            data: user,
            message: 'Entry Created Successfully'
        });

    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

exports.login = async(req, res) => {
    try {
        // extract email and password from user
        const {email, password} = req.body;

        //use .findOne({}) on the basis of email to find that, that user has an account

        const ExistingUser = await User.findOne({email});

        if(!ExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User not registered"
            })
        }

        const payload = {
            email: ExistingUser.email,
            firstName: ExistingUser.firstName,
            id: ExistingUser._id
        }

        const passwordMatch = await bcrypt.compare(password, ExistingUser.password)

        if(passwordMatch) {
            const token = jwt.sign({payload}, process.env.JWT_SECRET, { expiresIn: "24hr"})

            return res.status(200).json({
                success: true,
                message: "User Logged in Successfully",
                token,
                data: ExistingUser
            })

        }
        else {
            return res.status(500).json({
                success:false,
                message: "Incorrect password"
            })
        }


    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

exports.review = async(req, res) => {
    try {
        const {review, userId, facultyId, userName} = req.body;

        const newReview = await Review.create({review, userId, facultyId, userName});

        const updatedReviewForUser = await User.findByIdAndUpdate(userId, {$push: {review: newReview.review}}, {new: true})

        // const updatedReviewForFaculty = await Faculty.findByIdAndUpdate(facultyId, {$push: {review: newReview.review}}, {new: true})

        const newReviewSubdocument = new mongoose.model('Review')({
            userId: newReview.userId,
            review: newReview.review, // assuming review is a string,
            userName: newReview.userName
          });
          
          const updatedReviewForFaculty = await Faculty.findByIdAndUpdate(facultyId, {
            $push: { review: newReviewSubdocument }
          }, { new: true });

          



        return res.status(200).json({
            success: true,
            data: updatedReviewForUser, 
            message: "review has been stored"
        })
    }
    catch(error) {
        console.log("Error", error)
    }
}

exports.faculty = async(req, res) => {
    try {
        const {image, title, text, url, review} = req.body;

        const faculty = await Faculty.create({image, title, text, url, review});

        return res.status(200).json({
            success: true,
            data: faculty,
            message: "Faculty Created successfully"
        })
    }
    catch(error) {
        console.log(error)
    }
}


exports.getFacultyByName = async(req, res) => {
    try {
        const title = req.params.title;
        const faculty = await Faculty.findOne({title: {$regex: title, $options: 'i'}});

        if(!faculty) {
            return res.status(404).json({
                success: false,
                message: "No Data Found with the Given Id"
            })
        }

        res.status(200).json({
            success: true,
            data: faculty,
            message: "data fetched successfully"
        })

    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

exports.logout = async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        await BlacklistedToken.create({ token });
        
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    }
    catch(error) {
        console.log("Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
}