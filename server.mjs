import 'dotenv/config';
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import { connectDB } from './config/dbConfig.mjs';
import countryRoutes from './routes/countryRoutes.mjs';

const app = express();

// Configuracion EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Conexion a DB
connectDB();

// Rutas
app.get('/', (req, res) => res.render('landing'));
app.use('/paises', countryRoutes);
app.get('/acerca-de', (req, res) => res.render('about'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
    console.log(`--- Direcciones para testeo ---`);
    console.log(`Landing Page:        http://localhost:${PORT}`);
    console.log(`Dashboard principal: http://localhost:${PORT}/paises`);
    console.log(`Recargar API (Seed): http://localhost:${PORT}/paises/seed`);
    console.log(`Agregar un pais:     http://localhost:${PORT}/paises/nuevo`);
    console.log(`-------------------------------`);
});
