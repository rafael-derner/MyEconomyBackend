import { RowDataPacket } from 'mysql2';
import pool from '../utils/db';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  senha: string;
}

export const getUsuarioById = async (id: number): Promise<Usuario | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM usuario WHERE id = ?', [id]);
  return rows.length ? (rows[0] as Usuario) : null;
}

export const getUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM usuario WHERE email = ?', [email]);
    return rows.length ? (rows[0] as Usuario) : null;
}

export const createUsuario = async (usuario: Usuario): Promise<void> => {
  await pool.query('INSERT INTO usuario (nome, email, data_nascimento, senha) VALUES (?, ?, ?, ?)', [usuario.nome, usuario.email, usuario.dataNascimento, usuario.senha]);
};
