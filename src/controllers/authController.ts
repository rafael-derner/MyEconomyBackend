import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario, createUsuario, getUsuarioByEmail } from '../models/Usuario';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { nome, email, dataNascimento, senha, confirmacaoSenha } = req.body;

  try {
    if(nome == "" || email == "" ||  dataNascimento == "" ||  senha == "" ||  confirmacaoSenha == ""){
      throw new Error("Os campos são obrigatórios");
    }
    if (senha !== confirmacaoSenha) {
      throw new Error("As senhas não coincidem");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
      throw new Error("O e-mail é inválido");
    }
  
    const existingUsuario = await getUsuarioByEmail(email);
  
    if (existingUsuario) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
  
    const hashedPassword = await bcrypt.hash(senha, 10);
    
    const newUsuario: Usuario = {
      id: 0,
      nome,
      email,
      dataNascimento,
      senha: hashedPassword,
    };
  
    await createUsuario(newUsuario);
  
    return res.status(201).json({ message: 'Usuario created successfully' });
  } catch (error) {
    next(error);
  }
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
