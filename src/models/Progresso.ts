import { RowDataPacket } from 'mysql2';
import pool from '../utils/db';

export interface ProgressoMes {
  progresso: number;
  limite: number;
  gasto: number;
  mes: string;
}

export const getProgresso = async (usuario: number, mes: string): Promise<ProgressoMes | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('select ifnull(((sum(d.valor) / lm.valor) * 100), 0) as progresso, ifnull(sum(d.valor), 0) as gasto, lm.valor as limite, lm.mes from limiteMes lm left join despesa as d on d.limiteMesId = lm.id where lm.mes like ? and lm.usuarioId = ? group by lm.valor, lm.mes, d.id;', [mes, usuario]);
  return rows.length ? (rows[0] as ProgressoMes) : null;
};
