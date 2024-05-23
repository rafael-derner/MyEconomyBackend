import pool from '../utils/db';

export interface LimiteMes {
  id: number;
  valor: number;
  mes: string;
}

export const getAllLimiteMes = async (): Promise<LimiteMes[]> => {
  const [rows] = await pool.query('SELECT * FROM limite_mes');
  return rows as LimiteMes[];
};

export const getLimiteMesById = async (id: number): Promise<LimiteMes[]> => {
  const [rows] = await pool.query('SELECT * FROM limite_mes WHERE id = ?', [id]);
  return rows as LimiteMes[];
};

export const createLimiteMes = async (limiteMes: LimiteMes): Promise<void> => {
  await pool.query('INSERT INTO limite_mes (valor, mes) VALUES (?, ?)', [limiteMes.valor, limiteMes.mes]);
};

export const deleteLimiteMes = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM limite_mes WHERE id = ?', [id]);
};
