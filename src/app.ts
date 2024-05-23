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

pool.query('DROP TABLE IF EXISTS despesa; DROP TABLE IF EXISTS limite_mes; DROP TABLE IF EXISTS usuario; CREATE TABLE usuario (id int NOT NULL AUTO_INCREMENT, nome varchar(255) NOT NULL, email varchar(255) NOT NULL, data_nascimento date NOT NULL, senha varchar(255) NOT NULL, PRIMARY KEY (id), UNIQUE KEY email (email)); CREATE TABLE limite_mes (id int NOT NULL AUTO_INCREMENT, valor double(8,2) NOT NULL, mes varchar(20) NOT NULL, PRIMARY KEY (id)); CREATE TABLE despesa ( id int NOT NULL AUTO_INCREMENT, usuario_id int NOT NULL, descricao varchar(255) NOT NULL, valor double(8,2) NOT NULL, limite_mes_id int NOT NULL, PRIMARY KEY (id), KEY usuario_id (usuario_id), KEY limite_mes_id (limite_mes_id), CONSTRAINT despesa_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuario (id), CONSTRAINT despesa_ibfk_2 FOREIGN KEY (limite_mes_id) REFERENCES limite_mes (id)); INSERT INTO usuario (nome, email, data_nascimento, senha) VALUES ("teste", "teste@teste.com", "1980-01-15", "$2a$10$4TIAQ/btCWudfk/EbV6gIO7u.FO0snz0SuaAe4tS1aIA6JYx31rSy"); INSERT INTO limite_mes (valor, mes) VALUES (1000.00, "Maio/2024"); INSERT INTO despesa (usuario_id, descricao, valor, limite_mes_id) VALUES (1, "Compra de supermercado", 150.00, 1), (1, "Conta de luz", 75.00, 1)');

export default app;
