import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
        req.user = verified; // Attach user info to request
        next(); // Pass control to the next middleware/route
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(400).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
