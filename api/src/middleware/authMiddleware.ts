import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: Response) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "your-secret");
    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: Response) {
    const token = req.header("Authorization");
  
    if (!token) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, "your-secret");
      if (typeof decoded !== "object" || !decoded?.userId) {
        res.status(401).json({ error: "Access denied" });
        return;
      }

      if (decoded?.role !== "seller") {
        res.status(401).json({ error: "Access denied" });
        return;
      }
      
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: "Access denied" });
    }
  }
