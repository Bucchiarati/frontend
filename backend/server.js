const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432
});

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta de registro de usuario
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en la base de datos
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta de inicio de sesión
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Obtener el usuario de la base de datos
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token de acceso
    const token = jwt.sign({ userId: user.rows[0].id }, 'secret_key');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
