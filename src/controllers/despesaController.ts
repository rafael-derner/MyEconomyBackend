import { NextFunction, Request, Response } from 'express';
import { Despesa, createDespesa, deleteDespesa, getAllDespesas, getDespesaById } from '../models/Despesa';

interface AuthenticatedRequest extends Request {
  despesaId?: number;
}

export const getDespesa = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let despesas: Despesa[] = [];
  try {
    if(req.query.id != null){
      const despesaId = req.query.id!;
      despesas = await getDespesaById(Number(despesaId));
    } else {
      despesas = await getAllDespesas();
    }
    return res.status(200).json(despesas);
  } catch (error) {
    next(error);
  }
};

export const createNewDespesa = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { descricao, valor, limiteMesId } = req.body;
  try {
    const newDespesa = {
      id: 0,
      usuario_id: res.locals.usuario.id,
      descricao: descricao,
      valor: valor,
      limite_mes_id: limiteMesId,
    };

    await createDespesa(newDespesa);
    return res.status(201).json({ message: 'Despesa criada com sucesso' });
  } catch (error) {
    next(error)
  }
};

export const deleteDespesaById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const despesaId = req.query.id!;
    await deleteDespesa(Number(despesaId));
    return res.status(200).json({ message: 'Limite excluído com sucesso' });
  } catch (error) {
    next(error);
  }
};
