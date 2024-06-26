import { RowDataPacket } from 'mysql2';
import pool from '../utils/db';

export interface Despesa {
  id: number;
  usuarioId: number;
  descricao: string;
  valor: number;
  limiteMesId: number;
  mes: string;
}

export const getAllDespesas = async (): Promise<Despesa[]> => {
  const [rows] = await pool.query('SELECT * FROM despesa');
  return rows as Despesa[];
};

export const getDespesaById = async (id: number): Promise<Despesa | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM despesa WHERE id = ?', [id]);
  return rows.length ? (rows[0] as Despesa) : null;
};

export const getDespesaByMes = async (mes: string, usuario: number): Promise<Despesa[]> => {
  const [rows] = await pool.query('SELECT * FROM despesa WHERE usuarioId = ? AND limiteMesId = (SELECT id FROM limiteMes WHERE mes like ? AND usuarioId = ?)', [usuario, mes, usuario]);
  return rows as Despesa[];
};

export const create = async (despesa: Despesa): Promise<void> => {
  try {
    await pool.query('INSERT INTO despesa (usuarioId, descricao, valor, limiteMesId, mes) VALUES (?, ?, ?, (SELECT id FROM limiteMes WHERE mes like ? and usuarioId = ?), ?)', [despesa.usuarioId, despesa.descricao, despesa.valor, despesa.mes, despesa.usuarioId, despesa.mes]);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Erro ao inserir despesa");
    }
  }
};

export const update = async (despesa: Despesa): Promise<void> => {
  await pool.query('UPDATE despesa SET usuarioId = ?, descricao = ?, valor = ?, limiteMesId = (SELECT id FROM limiteMes WHERE mes like ? and usuarioId = ?), mes = ? WHERE id = ?', [despesa.usuarioId, despesa.descricao, despesa.valor, despesa.mes, despesa.usuarioId, despesa.mes, despesa.id] );
};

export const deleteDespesa = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM despesa WHERE id = ?', [id]);
};
