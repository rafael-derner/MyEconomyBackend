import { Request, Response, NextFunction } from 'express';
import { getUsuarioById } from '../models/Usuario';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  usuarioId: number;
}

interface AuthRequest extends Request {
  usuarioId?: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.locals.usuario = null;
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.usuarioId = decoded.usuarioId;

    getUsuarioById(req.usuarioId).then((response) => {
      res.locals.usuario = response;
      next();
    });
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
