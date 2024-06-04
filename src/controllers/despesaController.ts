import { NextFunction, Request, Response } from 'express';
import { Despesa, create, deleteDespesa, getAllDespesas, getDespesaById, getDespesaByMes, update } from '../models/Despesa';
import { isFuture } from '../utils/dateCompare';

interface AuthenticatedRequest extends Request {
  despesaId?: number;
}

export const getDespesa = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if(req.query.id != null){
      return res.status(200).json(await getDespesaById(Number(req.query.id!)));
    } else if(req.query.mes != null) {
      return res.status(200).json(await getDespesaByMes(String(req.query.mes), Number(res.locals.usuario.id)));
    } else {
      return res.status(200).json(await getAllDespesas());
    }
  } catch (error) {
    next(error);
  }
};

export const getDespesasDoMes = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let despesas: Despesa[] = [];
  try {
    const mes = req.query.mes!;
  } catch (error) {
    next(error);
  }
};

export const createNewDespesa = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { descricao, valor, mes } = req.body;
  try {
    if(descricao == "" || valor == "" || mes == ""){
      throw new Error("Os campos são obrigatórios");
    }
    const mesString = mes.split('/')[0];
    const anoString = mes.split('/')[1];
    if(isFuture(mesString, anoString)){
      const newDespesa = {
        id: 0,
        usuarioId: res.locals.usuario.id,
        descricao: descricao,
        valor: valor,
        limiteMesId: 0,
        mes: mes,
      };
  
      await create(newDespesa);
      return res.status(201).json({ message: 'Despesa criada com sucesso' });
    }
    throw new Error("O mês da despesa não pode ser anterior ao mês atual");
  } catch (error) {
    next(error)
  }
};

export const updateDespesa = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id, descricao, valor, mes } = req.body;
  try {    
    if(descricao == "" || valor == "" || mes == ""){
      throw new Error("Os campos são obrigatórios");
    }
    const mesString = mes.split('/')[0];
    const anoString = mes.split('/')[1];
    if(isFuture(mesString, anoString)){
      const despesa = {
        id: id,
        usuarioId: res.locals.usuario.id,
        descricao: descricao,
        valor: valor,
        limiteMesId: 0,
        mes: mes,
      };
      await update(despesa);
      return res.status(201).json({ message: 'Despesa atualizada com sucesso' });
    }
    throw new Error("O mês da despesa não pode ser anterior ao mês atual");
  } catch (error) {
    next(error)
  }
};

export const deleteDespesaById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const despesaId = req.query.id!;
    await deleteDespesa(Number(despesaId));
    return res.status(200).json({ message: 'Despesa excluída com sucesso' });
  } catch (error) {
    next(error);
  }
};
