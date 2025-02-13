const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir la raíz a index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configurar Nodemailer para el envío de correos
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Usamos Gmail para este ejemplo
    auth: {
        user: process.env.EMAIL_HOST_USER,  // Tu correo de Gmail
        pass: process.env.EMAIL_HOST_PASSWORD  // Tu contraseña de Gmail
    }
});

// Ruta para enviar correos electrónicos
app.post('/enviar-correo', (req, res) => {
    const { email, evento, fecha } = req.body;

    // Configurar el correo a enviar
    const mailOptions = {
        from: process.env.EMAIL_HOST_USER,
        to: email,
        subject: `Notificación del Cine: ${evento}`,
        text: `🔔 Hola, \n\nTe informamos sobre : ${evento}\nFecha: ${fecha}\n\n¡Esperamos contar con tu participación! Si necesitas más información, contáctanos.`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al enviar correo' });
        }
        console.log('Correo enviado: ' + info.response);
        res.status(200).json({ message: 'Correo enviado con éxito' });
    });
});

// Ruta para la página de asistentes
app.get('/directores.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'directores.html'));
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Ruta para la página de eventos
app.get('/generos.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'generos.html'));
});
// Ruta para la página de premio
app.get('/peliculas.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'peliculas.html'));
});
// Ruta para la página de eventos
app.get('/protagonistas.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'protagonistas.html'));
});
// Ruta para la página de premio
app.get('/paises.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'paises.html'));
});
// Ruta para la página de eventos
app.get('/asistentes.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'asistentes.html'));
});
// Ruta para la página de premio
app.get('/eventos.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'eventos.html'));
});
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
