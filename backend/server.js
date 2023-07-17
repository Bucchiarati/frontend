const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { default: migrate } = require('node-pg-migrate');


const app = express();
const port = 3000;

// Configura el middleware para analizar las solicitudes JSON
app.use(bodyParser.json());

// Configura el middleware para permitir solicitudes de origen cruzado
app.use(cors());

// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_glab',
  password: 'admin',
  port: 5432,
});

migrate({
  schema: 'public',
  direction: 'up',
  log: () => {}, // Opcional: puedes proporcionar una función de registro personalizada
  noLock: true, // Opcional: deshabilita el bloqueo de migraciones para evitar conflictos en entornos compartidos
  pool,
  migrationsTable: 'migrations', // Opcional: especifica el nombre de la tabla de migraciones
})
  .then(() => {
    // Inicia el servidor Express
    app.listen(port, () => {
      console.log(`Servidor backend iniciado en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al ejecutar las migraciones:', error);
  });

// Ruta para el inicio de sesión
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si el correo electrónico existe en la base de datos
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    // Genera un token de sesión o realiza otras acciones según tus necesidades
    const token = 'tu_token_de_sesion';

    // Devuelve el token en la respuesta
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});