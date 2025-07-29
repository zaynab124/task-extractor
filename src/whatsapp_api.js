// whatsapp_api.js
const cleanMessage = require('./cleanMessage');
const saveMessage = require('./saveMessage');

// Fonction principale pour traitement webhook WhatsApp
exports.main = async (req, res) => {
  const VERIFY_TOKEN = 'TokenVerify'; // ⚠️ À remplacer par ton propre token de vérification

  // 📌 Étape 1 : Vérification du webhook lors de l'enregistrement Meta
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res ? res.status(200).send(challenge) : { statusCode: 200, body: challenge };
    } else {
      return res ? res.sendStatus(403) : { statusCode: 403, body: 'Forbidden' };
    }
  }

  // 📌 Étape 2 : Réception et traitement des messages
  if (req.method === 'POST') {
    try {
      const body = req.body || JSON.parse(req.body); // compatibilité serverless
      const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

      if (message) {
        const text = message?.text?.body;
        const sender = message?.from;

        if (text && sender) {
          const cleanedText = cleanMessage(text);
          await saveMessage('whatsapp', sender, cleanedText);
          console.log('[whatsapp] Message enregistré :', cleanedText);
        }
      }

      return res ? res.status(200).send('OK') : { statusCode: 200, body: 'OK' };
    } catch (err) {
      console.error('[whatsapp] Erreur lors du traitement du message :', err);
      return res ? res.status(500).send('Error') : { statusCode: 500, body: 'Error' };
    }
  }

  // 📌 Étape 3 : Méthode non supportée
  return res ? res.sendStatus(404) : { statusCode: 404, body: 'Not found' };
};
