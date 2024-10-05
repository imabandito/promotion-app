import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  // console.log('req.headers.authorization',req.headers.authorization);
  
  console.log('token',token);
  

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "User unauthorized" });
      }
      req.user = user;
      next();
    });
  } else {
    console.log('authenticateJWT 401');
    
    return res.status(401).json({ message: "User unauthorized" });
  }
};
