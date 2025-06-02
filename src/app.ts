import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './config/db';
<<<<<<< HEAD
import usuariosRoutes from "./routes/usuariosRoutes";
import { authenticateToken } from "./middleware/usuarios";
=======
import usuariosRoutes from './routes/usuariosRoutes';
import prendaRoutes from './routes/prendaRoutes';  
import { authenticateToken } from './middleware/usuarios';
>>>>>>> abmPrenda

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD

app.use("/usuarios", usuariosRoutes);

app.get("/perfil", authenticateToken, (req, res) => {
  res.json({ message: "Bienvenido al perfil", user: (req as any).user });
});

sequelize.authenticate()
    .then(() => console.log("Conectado a MySQL"))
    .catch((error) => console.error("Error de conexión:", error));


sequelize.sync().then(() => {
  console.log('Conectado a la base de datos');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
=======
app.use('/usuarios', usuariosRoutes);

app.use('/prendas', prendaRoutes);

app.get('/perfil', authenticateToken, (req, res) => {
  res.json({ message: 'Bienvenido al perfil', user: (req as any).user });
});

sequelize.authenticate()
  .then(() => console.log('Conectado a MySQL'))
  .catch(error => console.error('Error de conexión:', error));

sequelize.sync({ alter: true })  
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error al sincronizar la base de datos:', err));
>>>>>>> abmPrenda
