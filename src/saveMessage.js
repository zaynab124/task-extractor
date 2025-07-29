const pool = require('./db');

async function saveMessage(platform, senderId, content) {
  try {
    await pool.query(
      'INSERT INTO messages (platform, sender_id, content) VALUES ($1, $2, $3)',
      [platform, senderId, content]
    );
    console.log('Message enregistré avec succes');
  } catch (err) {
    console.error('Erreur d enregistrement :', err);
  }
}

module.exports = saveMessage;
