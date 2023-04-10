const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "Unauthorized" });
  
  try {
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, "voting123");
    
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } 
  catch (error) {
    // Menghapus token jika terjadi error
    req.headers.authorization = "";
    return res.status(500).json({ message: error.message });
  }

};

const checkPrivilege = (req, res, next) => {
  next();
}

module.exports = {
  verifyToken,
  checkPrivilege
};