import { RowDataPacket } from 'mysql2';
import pool from '../utils/db';

export interface ProgressoMes {
  progresso: number;
  limite: number;
  gasto: number;
  mes: string;
}

export const getProgresso = async (usuario: number, mes: string): Promise<ProgressoMes | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('select ((sum(d.valor) / lm.valor) * 100) as progresso,	sum(d.valor) as gasto,	lm.valor as limite,	lm.mes from despesa d inner join limiteMes as lm on lm.id = d.limiteMesId where lm.mes like ? and d.usuarioId = ? group by lm.valor, lm.mes', [mes, usuario]);
  return rows.length ? (rows[0] as ProgressoMes) : null;
};
