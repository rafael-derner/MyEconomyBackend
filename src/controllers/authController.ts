import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsuarioByEmail, createUsuario, Usuario } from '../models/Usuario';

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

  if(dataNascimento.length > 10) dataNascimento.split('T')[0];

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

    return res.status(200).json({ token, usuario });
  } catch (error) {
    next(error); 
  }
};
