import { NextFunction, Request, Response } from 'express';
import { LimiteMes, create, deleteLimiteMes, getLimiteMesById, getLimiteMesByMes, getLimiteMesByUsuarioId, update } from '../models/LimiteMes';
import { ProgressoMes, getProgresso } from '../models/Progresso';
import { isFuture } from '../utils/dateCompare';

interface AuthenticatedRequest extends Request {
  id?: string;
}

export const getLimiteMes = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if(req.query.id != null){
      return res.status(200).json(await getLimiteMesById(Number(req.query.id!)));
    } else if(req.query.mes != null){
      return res.status(200).json(await getLimiteMesByMes(Number(res.locals.usuario.id), String(req.query.mes!)));
    } 
    return res.status(200).json(await getLimiteMesByUsuarioId(Number(res.locals.usuario.id)));
  } catch (error) {
    next(error);
  }
};



export const getProgressoMes = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let progesso: ProgressoMes | null;
  try {
    const mes = req.query.mes!;
    progesso = await getProgresso(Number(res.locals.usuario.id), String(mes));
    return res.status(200).json(progesso);
  } catch (error) {
    next(error);
  }
};

export const createNewLimiteMes = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { valor, mes } = req.body;
  try {    
    if(valor == "" || mes == ""){
      throw new Error("Os campos são obrigatórios");
    }

    const mesDuplicado = await getLimiteMesByMes(Number(res.locals.usuario.id), mes);
    if(mesDuplicado.length > 0){
      throw new Error("Já foi registrado um limite para o mês selecionado");
    }
    const mesString = mes.split('/')[0];
    const anoString = mes.split('/')[1];
    if(isFuture(mesString, anoString)){
      const newLimiteMes = {
        id: 0,
        valor,
        mes,
        usuarioId: Number(res.locals.usuario.id)
      };
      await create(newLimiteMes);
      return res.status(201).json({ message: 'Limite criado com sucesso' });
    }
    throw new Error("O mês do limite não pode ser anterior ao mês atual");
  } catch (error) {
    next(error)
  }

};

export const updateLimiteMes = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id, valor, mes } = req.body;
  try {    
    if(valor == "" || mes == ""){
      throw new Error("Os campos são obrigatórios");
    }

    const mesString = mes.split('/')[0];
    const anoString = mes.split('/')[1];
    if(isFuture(mesString, anoString)){
      const limiteMes = {
        id: id,
        valor: valor,
        mes: mes,
        usuarioId: Number(res.locals.usuario.id)
      };

      await update(limiteMes);
      return res.status(201).json({ message: 'Despesa atualizada com sucesso' });
    }
    throw new Error("O mês do limite não pode ser anterior ao mês atual");
  } catch (error) {
    next(error)
  }
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
