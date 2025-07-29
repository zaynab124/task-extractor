// local_server.js
const express = require('express');
const bodyParser = require('body-parser');
const whatsappHandler = require('./whatsapp_api.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/webhook/whatsapp', whatsappHandler.main); // Pour vérification
app.post('/webhook/whatsapp', whatsappHandler.main); // Pour messages

app.listen(PORT, () => {
  console.log(`Webhook local actif sur http://localhost:${PORT}`);
});
