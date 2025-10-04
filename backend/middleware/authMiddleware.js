import jwt from "jsonwebtoken";
import {User} from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
   
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("Authenticated User:", req.user);

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); 
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
