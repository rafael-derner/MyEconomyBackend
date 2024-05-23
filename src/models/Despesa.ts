import pool from '../utils/db';

export interface Despesa {
  id: number;
  usuario_id: number;
  descricao: string;
  valor: number;
  limite_mes_id: number;
}

export const getAllDespesas = async (): Promise<Despesa[]> => {
  const [rows] = await pool.query('SELECT * FROM despesa');
  return rows as Despesa[];
};

export const getDespesaById = async (id: number): Promise<Despesa[]> => {
  const [rows] = await pool.query('SELECT * FROM despesa WHERE id = ?', [id]);
  return rows as Despesa[];
};

export const createDespesa = async (despesa: Despesa): Promise<void> => {
  await pool.query('INSERT INTO despesa (usuario_id, descricao, valor, limite_mes_id) VALUES (?, ?, ?, ?)', [despesa.usuario_id, despesa.descricao, despesa.valor, despesa.limite_mes_id]);
};

export const deleteDespesa = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM despesa WHERE id = ?', [id]);
};
