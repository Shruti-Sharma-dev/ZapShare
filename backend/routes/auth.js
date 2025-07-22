import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // { userId: ... }
        req.user = decoded;          // attach payload to request object
        next();                       // proceed to the route handler
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};


router.post('/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });



        res.status(201).json({ success: true, message: 'User created successfully', user });


    }
    catch (error) {
        console.error("❌ Registration error:", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

})

router.post('/login', async (req, res) => {

    try {
        const { password } = req.body;
        const email = req.body.email.toLowerCase();
     

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: 'User does not exists' });
        }


        const checkedPassword = await bcrypt.compare(password, existingUser.password);

        if (!checkedPassword) {
            return res.status(401).json({ success: false, message: 'Password is not coreect' });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(201).json({
            success: true, user: {
                name: existingUser.name,
                userIdentity: existingUser._id,
            }, message: 'Login successfully', token
        });


    }
    catch (error) {
        console.error("❌ Registration error:", error.message);
        res.status(500).json({ success: false, message: 'Error in Login Server' });
    }





})

router.get('/verify', verifyToken, async (req, res) => {
    try {
        // req.user.userId was set in verifyToken middleware
        const user = await User.findById(req.user.userId).select('name');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });   // { success: true, user: { name: '...' } }
    } catch (error) {
        console.error('❌ Verify error:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
export default router;