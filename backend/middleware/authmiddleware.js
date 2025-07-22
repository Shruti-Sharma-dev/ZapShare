import jwt from 'jsonwebtoken';

import User from '../models/user.js'

const authMiddleware = async (req, res, next) => {
    try {


        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const user = await User.findById(decoded.userId);


        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const userName = { name: user.name, id: user._id };

        req.user = userName;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Please login to access this resource' });
    }
}

export default authMiddleware;


