const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	try {
		const token = authorization.replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.payload = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Authentication failed" });
		
	}
};