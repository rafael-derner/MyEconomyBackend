import { NextFunction, Request, Response } from 'express';
import { LimiteMes, createLimiteMes, deleteLimiteMes, getLimiteMesById, getAllLimiteMes } from '../models/LimiteMes';

interface AuthenticatedRequest extends Request {
  id?: string;
}

export const getLimiteMes = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let limites: LimiteMes[] = [];
  try {
    if(req.query.id != null){
      const limiteMesId = req.query.id!;
      limites = await getLimiteMesById(Number(limiteMesId));
    } else {
      limites = await getAllLimiteMes();
    }
    return res.status(200).json(limites);
  } catch (error) {
    next(error);
  }
};

export const createNewLimiteMes = async (req: AuthenticatedRequest, res: Response) => {
  const { valor, mes } = req.body;

  const newLimiteMes = {
    id: 0,
    valor,
    mes,
  };

  await createLimiteMes(newLimiteMes);
  return res.status(201).json({ message: 'Limite criado com sucesso' });
};

export const deleteLimiteMesById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const limiteMesId = req.query.id!;
    await deleteLimiteMes(Number(limiteMesId));
    return res.status(200).json({ message: 'Limite excluído com sucesso' });
  } catch (error) {
    next(error);
  }
};
