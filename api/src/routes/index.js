const { Router } = require('express');
const dogsRoutes = require('./dogs.js')
const temperamentsRoutes = require('./temperaments.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoutes)
router.use('/temperaments', temperamentsRoutes)


module.exports = router;
