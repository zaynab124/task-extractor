// telegram_test_server.js
const express = require('express');
const telegramHandler = require('./telegram_api');

const app = express();
const PORT = 3001;

// Middleware pour lire le JSON du corps de la requête
app.use(express.json());

// Route pour simuler le webhook Telegram
app.post('/webhook/telegram', telegramHandler.main);

// Lancement du serveur sur le port 3001
app.listen(PORT, () => {
  console.log(`Telegram Test Server running at http://localhost:${PORT}`);
});
