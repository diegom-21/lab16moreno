const express = require('express');
const next = require('next');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '../frontend' }); // ← apunta al frontend
const handle = app.getRequestHandler();

const { sequelize } = require('./db'); // tu conexión
const productosRoutes = require('./routes/productosRoutes');

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  // Rutas API
  server.use('/api/productos', productosRoutes);

  // Rutas de frontend (Next.js)
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
