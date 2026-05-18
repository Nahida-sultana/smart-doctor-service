const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from request header
const token = req.headers['authorization']?.split(' ')[1];

  // If no token, block the request
if (!token) {
    return res.status(401).json({ message: 'No token, access denied' });
}

try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next(); // move on to the actual route
} catch (err) {
    res.status(401).json({ message: 'Invalid token' });
}
};

module.exports = authMiddleware;