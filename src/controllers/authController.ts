import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsuarioByEmail, createUsuario, Usuario, getUsuarioById } from '../models/Usuario';

interface AuthenticatedRequest extends Request {
  id?: string;
}

export const buscar = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let usuario: Usuario;
  try {
    if(req.query.id != null){
      const usuarioId = req.query.id!;
      usuario = await getUsuarioById(Number(usuarioId));
      return res.status(200).json(usuario);
    } else {
      return res.status(400).json({ message: 'O ID e obrigatorio' });
    }
  } catch (error) {
    next(error);
  }
}

export const signup = async (req: Request, res: Response) => {
  const { nome, email, dataNascimento, senha, confirmacaoSenha } = req.body;

  if (senha !== confirmacaoSenha) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  const existingUsuario = await getUsuarioByEmail(email);

  if (existingUsuario) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);
  
  dataNascimento.split('T')[0];
  const newUsuario: Usuario = {
    id: 0,
    nome,
    email,
    dataNascimento,
    senha: hashedPassword,
  };

  await createUsuario(newUsuario);

  return res.status(201).json({ message: 'Usuario created successfully' });
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, senha } = req.body;

    const usuario = await getUsuarioByEmail(email);

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ usuarioId: usuario.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    
    return res.status(200).json({ token: token, id: usuario.id.toString(), nome: usuario.nome, email: usuario.email, dataNascimento: usuario.dataNascimento });
  } catch (error) {
    next(error);
  }
};
