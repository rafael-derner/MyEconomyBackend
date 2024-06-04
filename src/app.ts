import express from 'express';
import authRoutes from './routes/authRoutes';
import limiteRoutes from './routes/LimiteMesRoutes';
import despesaRoutes from './routes/despesaRoutes';
import cors from 'cors';
import pool from './utils/db';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', limiteRoutes);
app.use('/api', despesaRoutes);

app.use(errorMiddleware);

pool.query('DROP TABLE IF EXISTS despesa; DROP TABLE IF EXISTS limiteMes; DROP TABLE IF EXISTS usuario; CREATE TABLE usuario (id int NOT NULL AUTO_INCREMENT, nome varchar(255) NOT NULL, email varchar(255) NOT NULL, dataNascimento date NOT NULL, senha varchar(255) NOT NULL, PRIMARY KEY (id), UNIQUE KEY email (email)); CREATE TABLE limiteMes (id int NOT NULL AUTO_INCREMENT, valor double(8,2) NOT NULL, mes varchar(20) NOT NULL, usuarioId int NOT NULL, PRIMARY KEY (id), CONSTRAINT limiteMes_ibfk_1 FOREIGN KEY (usuarioId) REFERENCES usuario (id)); CREATE TABLE despesa ( id int NOT NULL AUTO_INCREMENT, usuarioId int NOT NULL, descricao varchar(255) NOT NULL, valor double(8,2) NOT NULL, limiteMesId int NOT NULL, mes varchar(25) NOT NULL, PRIMARY KEY (id), KEY usuarioId (usuarioId), KEY limiteMesId (limiteMesId), CONSTRAINT despesa_ibfk_1 FOREIGN KEY (usuarioId) REFERENCES usuario (id), CONSTRAINT despesa_ibfk_2 FOREIGN KEY (limiteMesId) REFERENCES limiteMes (id)); INSERT INTO usuario (nome, email, dataNascimento, senha) VALUES ("teste", "email", "1980-01-15", "$2a$10$4TIAQ/btCWudfk/EbV6gIO7u.FO0snz0SuaAe4tS1aIA6JYx31rSy"); INSERT INTO limiteMes (valor, mes, usuarioId) VALUES (1000.00, "junho/2024", 1); INSERT INTO despesa (usuarioId, descricao, valor, limiteMesId, mes) VALUES (1, "Compra de supermercado", 150.00, 1, "junho/2024"), (1, "Conta de luz", 75.00, 1, "junho/2024")');

export default app;
