const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'ayubisagoodbo$y';
//ROUTE 1: Create a user using Post. Doesn't require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 charaters').isLength({ min: 5 })],
    async (req, res) => {
        try {
            //If error occured. return bad request with error.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "errorMessage": errors.array() });
            }
            //Check whether the email already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: 'User already exist with this email.' })
            }
            const salt = await bcryptjs.genSalt(10);
            const securePassword = await bcryptjs.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            })
            const payload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(payload, JWT_SECRET);
            res.json({ user });
        } catch (err) {
            console.error(err.message);
            res.status(500).json(err.message);
        }

    })
//ROUTE 2: Authenticate user login using: POST ""api/auth/userlogin.
router.post('/userlogin', [
    body('email', 'Please enter a valid email address').isEmail(),
    body('password', 'Password cannot be blank').not().isEmpty().trim().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Please enter a valid credentials.' })
        }
        const passwordCompare = await bcryptjs.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(404).json({ error: "Please enter a valid credentials." })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({ authToken })
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }

})

//ROUTE 3: Fetch LoggedIn User Detail using: GET 'api/auth/getuser'. Login required
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.find().select("-password")
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message)
    }
})

//ROUTE 4: Update a user using PUT. Doesn't require auth
router.put('/updateuser/:id', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
],
    async (req, res) => {
        try {
            const newUser = { name: req.body.name, email: req.body.email };
            //If error occured. return bad request with error.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "errorMessage": errors.array() });
            }
            //Check whether the email already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: 'User already exist with this email.' })
            }

            user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send('User not found');
            }

            user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true }).select("-password")

            res.json({ user });
        } catch (err) {
            console.error(err.message);
            res.status(500).json(err.message);
        }

    })

//ROUTE 4: Delete a user using DELETE. Doesn't require auth
router.delete('/deleteuser/:id', [
],
    async (req, res) => {
        try {

            let user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send('User not found');
            }

            user = await User.findByIdAndDelete(req.params.id)

            res.json({ success: "User has been deleted successfully", user: user });
        } catch (err) {
            console.error(err.message);
            res.status(500).json(err.message);
        }

    })

module.exports = router;