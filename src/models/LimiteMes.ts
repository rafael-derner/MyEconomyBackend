import pool from '../utils/db';

export interface LimiteMes {
  id: number;
  valor: number;
  mes: string;
  usuarioId: number;
}

export const getLimiteMesByUsuarioId = async (usuarioId: number): Promise<LimiteMes[]> => {
  const [rows] = await pool.query('SELECT * FROM limiteMes WHERE usuarioId = ?', [usuarioId]);
  return rows as LimiteMes[];
};

export const getLimiteMesById = async (id: number): Promise<LimiteMes[]> => {
  const [rows] = await pool.query('SELECT * FROM limiteMes WHERE id = ?', [id]);
  return rows as LimiteMes[];
};

export const getLimiteMesByMes = async (usuarioId: number, mes: string): Promise<LimiteMes[]> => {
  const [rows] = await pool.query('SELECT * FROM limiteMes WHERE mes like ? and usuarioId = ?', [mes, usuarioId]);
  return rows as LimiteMes[];
};

export const create = async (limiteMes: LimiteMes): Promise<void> => {
  await pool.query('INSERT INTO limiteMes (valor, mes, usuarioId) VALUES (?, ?, ?)', [limiteMes.valor, limiteMes.mes, limiteMes.usuarioId]);
};

export const update = async (limiteMes: LimiteMes): Promise<void> => {
  await pool.query('UPDATE limiteMes SET valor = ?, mes = ? WHERE id = ?', [limiteMes.valor, limiteMes.mes, limiteMes.id] );
};


export const deleteLimiteMes = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM limiteMes WHERE id = ?', [id]);
};
